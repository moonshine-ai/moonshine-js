import MoonshineModel from "./model";
import { MoonshineSettings } from "./constants";
import { TranscriberCallbacks } from "./transcriber";
import StreamTranscriber from "./streamTranscriber";

/**
 * An interface for accessing the user's microphone and generating transcriptions using an underlying {@link StreamTranscriber}.
 */
class MicrophoneTranscriber extends StreamTranscriber {

    /**
     * Creates a transcriber for transcribing an audio stream from a mic.
     *
     * @param callbacks A set of optional {@link TranscriberCallbacks} used to trigger behavior at different steps of the
     * transcription lifecycle.
     * @param modelURL The URL that the underlying {@link MoonshineModel} weights should be loaded from,
     * relative to {@link MoonshineSettings.BASE_ASSET_PATH}
     *
     * @example
     * This basic example demonstrates the use of the transcriber with custom callbacks:
     *
     * ``` ts
     * import MicrophoneTranscriber from "@usefulsensors/moonshine-js";
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
     *          onTranscriptionCommitted(text: string | undefined) {
     *              console.log(
     *                  "onTranscriptionCommitted(" + text + ")"
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
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {},
        useVAD: boolean = false
    ) {
        super(modelURL, callbacks, useVAD);
    }

    /**
     * Starts transcription.
     *
     * This will request microphone permissions (if not already provided), load the model (if not already loaded), and
     * generate an updated transcription every {@link MoonshineSettings.FRAME_SIZE} milliseconds. Transcription will stop
     * when {@link stop} is called, or when {@link MoonshineSettings.MAX_RECORD_MS} is passed (whichever comes first).
     */
    async start() {
        // get stream from microphone input
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                channelCount: 1,
                echoCancellation: true,
                autoGainControl: true,
                noiseSuppression: true,    
            }
        });
        super.attachStream(stream);
        super.start();
    }
}

export default MicrophoneTranscriber;
