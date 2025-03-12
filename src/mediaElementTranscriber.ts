import StreamTranscriber from "./streamTranscriber";
import { TranscriberCallbacks } from "./transcriber";

/**
 * Transcribes the output of an <audio> or <video> element.
 */
class MediaElementTranscriber extends StreamTranscriber {
    private mediaElement: HTMLMediaElement;

    /**
     *
     * @param mediaElement
     * @param modelURL
     * @param callbacks
     * @param useVAD
     */
    public constructor(
        mediaElement: HTMLMediaElement,
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {},
        useVAD: boolean = false
    ) {
        super(modelURL, callbacks, useVAD);
        this.mediaElement = mediaElement;
    }

    async start() {
        if (!this.mediaRecorder) {
            // source: media element
            const source = this.audioContext.createMediaElementSource(
                this.mediaElement
            );
            // destination: a new MediaStream to pass to the parent StreamTranscriber
            const destination =
                this.audioContext.createMediaStreamDestination();
            const stream = destination.stream;

            // connect element to browser audio context (so we still hear the audio)
            source.connect(this.audioContext.destination);
            // connect element to our new MediaStream
            source.connect(destination);

            super.attachStream(stream);
        }
        super.start();
    }
}

export default MediaElementTranscriber;
