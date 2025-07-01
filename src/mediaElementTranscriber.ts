import { TranscriberCallbacks, Transcriber } from "./transcriber";

/**
 * Transcribes the output of an `<audio>` or `<video>` HTML element.
 */
class MediaElementTranscriber extends Transcriber {
    private isAttached: boolean = false;
    private mediaElement: HTMLMediaElement;

    /**
     * Creates a transcriber that generates transcriptions from the output of HTML `<audio>` or `<video>` elements.
     */
    public constructor(
        mediaElement: HTMLMediaElement,
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {},
        useVAD: boolean = true,
        precision: string = "float"
    ) {
        super(modelURL, callbacks, useVAD, precision);
        this.mediaElement = mediaElement;
        this.mediaElement.addEventListener("play", () => {
            this.start();
        });
        this.mediaElement.addEventListener("pause", () => {
            this.stop();
        });
    }

    public async start() {
        if (!this.isAttached) {
            // source: media element
            const source = this.audioContext.createMediaElementSource(
                this.mediaElement
            );
            // destination: a new MediaStream to pass to the parent Transcriber
            const destination =
                this.audioContext.createMediaStreamDestination();
            const stream = destination.stream;

            // connect element to browser audio context (so we still hear the audio)
            source.connect(this.audioContext.destination);
            // connect element to our new MediaStream
            source.connect(destination);

            super.attachStream(stream);
            this.isAttached = true;
        }
        super.start();
    }
}

/**
 * Transcribes a `<video>` element, rendering the results as captions on the video.
 */
class VideoCaptioner extends MediaElementTranscriber {

    /**
     * Creates a transcriber that overlays transcription output as captions on a `<video>` element.
     */
    public constructor(
        videoElement: HTMLVideoElement,
        modelURL: string,
        useVAD: boolean = false,
        wrapperStyle: Partial<CSSStyleDeclaration> = {},
        captionsStyle: Partial<CSSStyleDeclaration> = {},
        commitElementStyle: Partial<CSSStyleDeclaration> = {},
        updateElementStyle: Partial<CSSStyleDeclaration> = {},
        precision: string = "float"
    ) {
        super(videoElement, modelURL, {}, useVAD, precision);

        const parentHeight = videoElement.clientHeight;
        const parentWidth = videoElement.clientWidth;
        const baseSize = Math.min(parentWidth, parentHeight);
        const fontSize = baseSize * 0.05;
        const margin = baseSize * 0.15;
        
        let defaultWrapperStyle = {
            display: "inline-block",
            position: "relative",
            width: `${parentWidth}px`,
            height: `${parentHeight}px`,
        };
    
        let defaultCaptionsStyle = {
            position: "absolute",
            bottom: `${(parentHeight/3) - (fontSize*3)}px`,
            color: "#ffffff",
            fontSize: `${fontSize}px`,
            fontFamily: "sans-serif",
            zIndex: "2",
            height: `${fontSize * 3}px`,
            width: `${parentWidth - (margin * 2)}px`,
            textAlign: "center",
            marginLeft: `${margin}px`,
            marginRight: `${margin}px`,
            lineHeight: `${fontSize * 1.5}px`,
        };

        let defaultUpdateElementStyle = {
            color: "#aaaaaa",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
        };

        let defaultCommitElementStyle = {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
        };

        function camelToDash(str: string) {
            return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
        }
        function assignDashCaseStyle(styleObj: Partial<CSSStyleDeclaration>, target: CSSStyleDeclaration) {
            for (const key in styleObj) {
                if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
                    const dashKey = camelToDash(key);
                    // @ts-ignore
                    target.setProperty(dashKey, styleObj[key]);
                }
            }
        }

        const wrapper = document.createElement("div");
        assignDashCaseStyle(defaultWrapperStyle, wrapper.style);
        assignDashCaseStyle(wrapperStyle, wrapper.style);

        const captionsWrapper = document.createElement("div");
        assignDashCaseStyle(defaultCaptionsStyle, captionsWrapper.style);
        assignDashCaseStyle(captionsStyle, captionsWrapper.style);

        const commitElement = document.createElement("span");
        assignDashCaseStyle(defaultCommitElementStyle, commitElement.style);
        assignDashCaseStyle(commitElementStyle, commitElement.style);
        captionsWrapper.appendChild(commitElement);

        const updateElement = document.createElement("span");
        assignDashCaseStyle(defaultUpdateElementStyle, updateElement.style);
        assignDashCaseStyle(updateElementStyle, updateElement.style);
        captionsWrapper.appendChild(updateElement);

        videoElement.parentElement.insertBefore(wrapper, videoElement);
        wrapper.appendChild(captionsWrapper);
        wrapper.appendChild(videoElement);

        var commit = "";

        function setCaption(text, maxChars, maxLines, shouldCommit = false) {
            if (commit.length + text.length >= maxChars * maxLines) {
                commit = "";
            }
            if (shouldCommit) {
                commit = `${commit} ${text}`;
                commitElement.textContent = commit;
                updateElement.textContent = "";
            } else {
                updateElement.textContent = `\u00A0${text}`;
            }
        }

        this.callbacks.onTranscriptionUpdated = function (text) {
            if (text && !useVAD) {
                setCaption(text, 60, 2);
            }
        };
        this.callbacks.onTranscriptionCommitted = function (text) {
            setCaption(text, 60, 2, true);
        };
    }
}

export { MediaElementTranscriber, VideoCaptioner };
