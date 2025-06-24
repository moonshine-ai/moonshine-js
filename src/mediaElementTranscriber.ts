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
        useVAD: boolean = true
    ) {
        super(modelURL, callbacks, useVAD);
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
        useVAD: boolean = false
    ) {
        super(videoElement, modelURL, {}, useVAD);

        const parentHeight = videoElement.clientHeight;
        const parentWidth = videoElement.clientWidth;

        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";
        wrapper.style.width = `${parentWidth}`;
        wrapper.style.height = `${parentHeight}`;

        const baseSize = Math.min(parentWidth, parentHeight);
        const fontSize = baseSize * 0.05;

        const captionsWrapper = document.createElement("div");
        captionsWrapper.style.position = "absolute";
        captionsWrapper.style.bottom = `${(parentHeight/3) - (fontSize*3)}px`;
        captionsWrapper.style.color = "#ffffff";
        captionsWrapper.style.fontSize = `${fontSize}px`;
        captionsWrapper.style.fontFamily = "sans-serif";
        captionsWrapper.style.zIndex = "2";
        captionsWrapper.style.height = `${fontSize * 3}px`;
        captionsWrapper.style.width = `${parentWidth}`;

        const commitElement = document.createElement("span");
        commitElement.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        captionsWrapper.appendChild(commitElement);

        const updateElement = document.createElement("span");
        updateElement.style.color = "#aaaaaa";
        updateElement.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
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
            if (text) setCaption(text, 60, 2);
        };
        this.callbacks.onTranscriptionCommitted = function (text) {
            setCaption(text, 60, 2, true);
        };
    }
}

export { MediaElementTranscriber, VideoCaptioner };
