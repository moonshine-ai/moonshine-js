import MoonshineModel from "./model";
import { MoonshineSettings } from "./constants";
import { Transcriber, TranscriberCallbacks } from "./transcriber"
import StreamTranscriber from "./streamTranscriber";

/**
 * An interface for accessing the user's microphone, loading the moonshine model, streaming audio, and generating transcriptions.
 */
class MicrophoneTranscriber extends Transcriber {
    private transcriber: StreamTranscriber | undefined = undefined;

    /**
     * Creates a transcriber for transcribing an audio stream from a mic.
     *
     * @param callbacks - A set of optional {@link TranscriberCallbacks} used to trigger page behavior at different steps of the
     * transcription lifecycle. The following callbacks can be defined:
     *
     * onModelLoadStarted() - called when the model begins to load (or download, if hosted elsewhere)
     * 
     * onTranscribeStarted() - called once when transcription starts
     * 
     * onTranscribeStopped() - called once when transcription stops
     * 
     * onTranscriptionUpdated(text) - called every {@link MoonshineSettings.FRAME_SIZE} milliseconds while
     * transcription is active
     *
     * @param modelURL -the URL that the underlying {@link MoonshineModel} weights should be loaded from,
     * relative to {@link MoonshineSettings.BASE_ASSET_PATH}
     *
     * @example
     * This basic example demonstrates the use of the transcriber with custom callbacks:
     * 
     * ``` ts
     * import MicrophoneTranscriber from "@usefulsensors/moonshine";
     * 
     * var transcriber = new MicrophoneTranscriber(
     *      {
     *          onModelLoadStarted() {
     *              console.log("onModelLoadStarted()");
     *          },
     *          onTranscribeStarted() {
     *              console.log("onTranscribeStarted()");
     *          },
     *          onTranscribeStopped() {
     *              console.log("onTranscribeStopped()");
     *          },
     *          onTranscriptionUpdated(text: string | undefined) {
     *              console.log(
     *                  "onTranscriptionUpdated(" + text + ")"
     *              );
     *          },
     *      },
     *      "model/tiny"
     * );
     *
     * transcriber.start();
     * ```
     */
    public constructor(
        callbacks: Partial<TranscriberCallbacks> = {},
        modelURL: string
    ) {
        super(callbacks, modelURL)
    }

    /**
     * Starts transcription.
     *
     * This will request microphone permissions (if not already provided), load the model (if not already loaded), and
     * generate an updated transcription every {@link MoonshineSettings.FRAME_SIZE} milliseconds. Transcription will stop
     * when {@link stop} is called, or when {@link MoonshineSettings.MAX_RECORD_MS} is passed (whichever comes first).
     */
    async start() {
        // set audio input device and create audio context
        if (!this.transcriber) {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            this.transcriber = new StreamTranscriber(stream, this.callbacks, Transcriber.modelURL)
        }
        this.transcriber.start()
    }

    /**
     * Stops transcription.
     */
    stop() {
        if (this.transcriber) {
            this.transcriber.stop()
        }
    }
}

export default MicrophoneTranscriber;
