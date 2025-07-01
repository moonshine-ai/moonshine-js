import { Transcriber, TranscriberCallbacks } from "./transcriber";
import { MoonshineError } from "./error";

/**
 * Accesses the user's microphone and transcribes their speech.
 */
class MicrophoneTranscriber extends Transcriber {

    /**
     * Creates a transcriber for transcribing an audio stream from a mic.
     *
     * @example
     * This basic example demonstrates the use of the transcriber with custom callbacks:
     *
     * ``` ts
     * import MicrophoneTranscriber from "@moonshine-ai/moonshine-js";
     *
     * var transcriber = new MicrophoneTranscriber(
     *      "model/tiny"
     *      {
     *          onPermissionsRequested() {
     *              console.log("Requesting permissions.") 
     *          },
     *          onError(error) {
     *              console.log(`Error: ${error}`)
     *          },
     *          onModelLoadStarted() {
     *              console.log("onModelLoadStarted()");
     *          },
     *          onTranscribeStarted() {
     *              console.log("onTranscribeStarted()");
     *          },
     *          onTranscribeStopped() {
     *              console.log("onTranscribeStopped()");
     *          },
     *          onTranscriptionUpdated(text: string) {
     *              console.log(
     *                  "onTranscriptionUpdated(" + text + ")"
     *              );
     *          },
     *          onTranscriptionCommitted(text: string) {
     *              console.log(
     *                  "onTranscriptionCommitted(" + text + ")"
     *              );
     *          },
     *      },
     *      false // use streaming mode
     * );
     *
     * transcriber.start();
     * ```
     */
    public constructor(
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {},
        useVAD: boolean = true,
        precision: string = "float"
    ) {
        super(modelURL, callbacks, useVAD, precision);
    }

    /**
     * Starts transcription. This will request permission to access the user's microphone, if it hasn't already been granted.
     *
     * Transcription will stop when {@link stop} is called.
     */
    public async start() {
        // get stream from microphone input
        const status = await navigator.permissions.query({ name: "microphone" as PermissionName });
        if (status.state == "denied") {
            this.callbacks.onError(MoonshineError.PermissionDenied)
        }
        else {
            try {
                this.callbacks.onPermissionsRequested()
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        channelCount: 1,
                        echoCancellation: true,
                        autoGainControl: true,
                        noiseSuppression: true,
                        sampleRate: 16000 
                    }
                });
                super.attachStream(stream);
                super.start();
            } catch {
                this.callbacks.onError(MoonshineError.PermissionDenied)
                super.stop();
            }
        }
    }
}

export default MicrophoneTranscriber;
