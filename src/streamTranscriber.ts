import MoonshineModel from "./model";
import { Transcriber, TranscriberCallbacks } from "./transcriber";
import { Settings } from "./constants";
import { AudioNodeVAD } from "@ricky0123/vad-web";
import Log from "./log";

/**
 * Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.
 *
 * Read more about working with MediaStreams: {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream}
 */
class StreamTranscriber extends Transcriber {
    protected audioContext: AudioContext | undefined = undefined;
    // private audioBuffer: AudioBuffer | undefined = undefined;
    private frameBuffer: Float32Array | undefined = undefined;
    private voiceActivityDetector: AudioNodeVAD | undefined = undefined;
    private committedTranscript: string = "";
    public isActive: boolean = false;

    /**
     * Creates a transcriber for transcribing a MediaStream from any source. After creating the {@link StreamTranscriber}, you must invoke
     * {@link StreamTranscriber.attachStream} to provide a MediaStream that you want to transcribe.
     *
     * @param modelURL The URL that the underlying {@link MoonshineModel} weights should be loaded from,
     * relative to {@link Settings.BASE_ASSET_PATH}.
     *
     * @param callbacks A set of {@link TranscriberCallbacks} used to trigger behavior at different steps of the
     * transcription lifecycle. For transcription-only use cases, you should define the {@link TranscriberCallbacks} yourself;
     * when using the transcriber for voice control, you should create a {@link VoiceController} and pass it in.
     *
     * @param useVAD A boolean specifying whether or not to use Voice Activity Detection (VAD) on audio processed by the transcriber.
     * When set to `true`, the transcriber will only process speech at the end of each chunk of voice activity.
     *
     * @example
     * This basic example demonstrates the use of the transcriber with custom callbacks:
     *
     * ``` ts
     * import StreamTranscriber from "@usefulsensors/moonshine-js";
     *
     * var transcriber = new StreamTranscriber(
     *      "model/tiny",
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
     *      }
     * );
     *
     * // Get a MediaStream from somewhere (user mic, active tab, an <audio> element, WebRTC source, etc.)
     * ...
     *
     * transcriber.attachStream(stream);
     * transcriber.start();
     * ```
     */
    public constructor(
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {},
        useVAD: boolean = true
    ) {
        super(modelURL, callbacks);

        this.audioContext = new AudioContext();

        // streaming parameters
        const frameSize = 512; // as specified by silero v5
        const interval = 16; // inference interval
        const maxFrames = interval * 6; // maximum before clearing buffer
        this.frameBuffer = new Float32Array(maxFrames * frameSize);
        var frameCount = 0;
        var isTalking = false;

        // perform continuous inferences during speech if useVAD is false
        const onFrameProcessed = useVAD
            ? (probs, frame) => {}
            : (probs, frame) => {
                  if (isTalking) {
                      if (frameCount <= maxFrames) {
                          this.frameBuffer.set(frame, frameCount * frameSize);
                          frameCount += 1;
                      }
                      if (frameCount > 0 && frameCount % interval == 0) {
                          // inference
                          Transcriber.model
                              ?.generate(
                                  this.frameBuffer.subarray(
                                      0,
                                      frameCount * frameSize
                                  )
                              )
                              .then((text) => {
                                  this.callbacks.onTranscriptionUpdated(text);
                              });
                      }
                      if (frameCount >= maxFrames) {
                          // clear buffer (leave some overhang?)
                          this.frameBuffer = new Float32Array(maxFrames * frameSize);
                          frameCount = 0;
                      }
                  }
              };

        AudioNodeVAD.new(this.audioContext, {
            onFrameProcessed: onFrameProcessed,
            onVADMisfire: () => {
                Log.log("StreamTranscriber.onVADMisfire()");
            },
            onSpeechStart: () => {
                Log.log("StreamTranscriber.onSpeechStart()");
                this.callbacks.onSpeechStart();
                if (!useVAD) isTalking = true; // flag is only used when streaming
            },
            onSpeechEnd: (floatArray) => {
                Log.log("StreamTranscriber.onSpeechEnd()");
                this.callbacks.onSpeechEnd();
                if (!useVAD) {
                    // flag and buffer only used in streaming mode
                    isTalking = false;
                    this.frameBuffer = new Float32Array(maxFrames * frameSize);
                    frameCount = 0;
                }
                Transcriber.model?.generate(floatArray).then((text) => {
                    this.callbacks.onTranscriptionUpdated(text);
                    this.callbacks.onTranscriptionCommitted(
                        this.committedTranscript
                    );
                    this.committedTranscript += " " + text;
                });
            },
            model: "v5",
        }).then((vad) => {
            this.voiceActivityDetector = vad;
        });
    }

    /**
     * Attaches a MediaStream to this {@link StreamTranscriber} for transcription. A MediaStream must be attached before
     * starting transcription.
     *
     * @param stream A MediaStream to transcribe
     */
    public attachStream(stream: MediaStream) {
        //  = new MediaRecorder(stream);
        if (this.voiceActivityDetector) {
            var sourceNode = new MediaStreamAudioSourceNode(this.audioContext, {
                mediaStream: stream,
            });
            this.voiceActivityDetector.receive(sourceNode);
            Log.log(
                "StreamTranscriber.attachStream(): VAD set to receive source node from stream."
            );
        }
    }

    /**
     * Detaches the MediaStream used for transcription.
     */
    public detachStream() {
        // if (this.mediaRecorder) {
        //     this.stop();
        //     this.mediaRecorder.stream.getTracks().forEach((t) => t.stop());
        //     this.mediaRecorder = undefined;
        // }
    }

    /**
     * Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
     * we want to double-check the audio being input to the model while debugging.
     *
     * @returns An AudioBuffer
     */
    public getAudioBuffer(): AudioBuffer {
        const numChannels = 1;
        const audioBuffer = this.audioContext.createBuffer(numChannels, this.frameBuffer.length, 16000);
        audioBuffer.getChannelData(0).set(this.frameBuffer);
        return audioBuffer;
    }

    /**
     * Starts transcription.
     *
     * if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
     * else if `useVAD === false`: generate an updated transcription every {@link Settings.FRAME_SIZE} milliseconds.
     *
     * Transcription will stop when {@link stop} is called, or when {@link Settings.MAX_RECORD_MS} is passed (whichever comes first).
     *
     * Note that the {@link StreamTranscriber} must have a MediaStream attached via {@link StreamTranscriber.attachStream} before
     * starting transcription.
     */
    async start() {
        if (!this.isActive) {
            this.isActive = true;
            this.committedTranscript = "";

            // load model if not loaded
            if (!Transcriber.model.isLoaded()) {
                await super.loadModel();
            }

            this.callbacks.onTranscribeStarted();
            this.voiceActivityDetector.start();
        }
    }

    /**
     * Stops transcription.
     */
    stop() {
        this.isActive = false;
        if (this.voiceActivityDetector) {
            this.voiceActivityDetector.pause();
        }
        // if (this.mediaRecorder) {
        //     this.audioBuffer = undefined;
        //     this.mediaRecorder.stop();
        // }
    }
}

export default StreamTranscriber;
