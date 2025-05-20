import { Settings } from "./constants";
import { TranscriberCallbacks } from "./transcriber";
import StreamTranscriber from "./streamTranscriber";
import { MoonshineError } from "./error";

/**
 * Accesses the user's microphone and transcribes their speech.
 */
class MicrophoneTranscriber extends StreamTranscriber {

    /**
     * Creates a transcriber for transcribing an audio stream from a mic.
     *
     * @example
     * This basic example demonstrates the use of the transcriber with custom callbacks:
     *
     * ``` ts
     * import MicrophoneTranscriber from "@usefulsensors/moonshine-js";
     *
     * var transcriber = new MicrophoneTranscriber(
     *      "model/tiny"
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
     * This will request microphone permissions (if not already provided), load the model (if not already loaded), and do
     * one of the following:
     * 
     * if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
     * else if `useVAD === false`: generate an updated transcription every {@link Settings.FRAME_SIZE} milliseconds. 
     * 
     * Transcription will stop when {@link stop} is called, or when {@link Settings.MAX_RECORD_MS} is passed (whichever comes first).
     */
    async start() {
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
                    }
                });
                super.attachStream(stream);
                super.start();
            } catch {
                this.callbacks.onError(MoonshineError.PermissionDenied)
            }
        }
    }
}

export default MicrophoneTranscriber;
