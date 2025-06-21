import { Settings } from "./constants";
import MoonshineModel from "./model";
import { AudioNodeVAD } from "@ricky0123/vad-web";
import Log from "./log";
import { MoonshineError } from "./error";

/**
 * Callbacks are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application
 * in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.
 *
 * @property onPermissionsRequested() - called when permissions to a user resource (e.g., microphone) have been requested (but not necessarily granted yet)
 *
 * @property onError(error: MoonshineError) - called when an error occurs.
 *
 * @property onModelLoadStarted() - called when the {@link MoonshineModel} and VAD begins to load (or download, if hosted elsewhere)
 *
 * @property onModelLoaded() - called when the {@link MoonshineModel} and VAD are loaded. This means the Transcriber is now ready to use.
 *
 * @property onTranscribeStarted() - called once when transcription starts
 *
 * @property onTranscribeStopped() - called once when transcription stops
 *
 * @property onTranscriptionUpdated(text: string) - called every {@link Settings.STREAM_UPDATE_INTERVAL} milliseconds while
 * transcription is active if useVAD == false. Use this callback when you don't need long-running transcription - you only care about
 * the most-recent transcription output. Note that the transcription output may be empty in some cases.
 *
 * @property onTranscriptionCommitted(text: string) - called every {@link Settings.STREAM_COMMIT_INTERVAL} milliseconds while
 * transcription is active and useVAD == false, or every {@link Settings.VAD_COMMIT_INTERVAL} when useVAD == true. Use this callback
 * for a long-running transcription of audio, like captioning a video or microphone stream.
 *
 * @property onSpeechStart() - called when the VAD model detects the start of speech
 *
 * @property onSpeechEnd() - called when the VAD model detects the end of speech
 *
 * @interface
 */
interface TranscriberCallbacks {
    onPermissionsRequested: () => any;

    onError: (error) => any;

    onModelLoadStarted: () => any;

    onModelLoaded: () => any;

    onTranscribeStarted: () => any;

    onTranscribeStopped: () => any;

    onTranscriptionUpdated: (text: string) => any;

    onTranscriptionCommitted: (text: string) => any;

    onSpeechStart: () => any;

    onSpeechEnd: () => any;
}

const defaultTranscriberCallbacks: TranscriberCallbacks = {
    onPermissionsRequested: function () {
        Log.log("Transcriber.onPermissionsRequested()");
    },
    onError: function (error) {
        Log.error("Transcriber.onError(" + error + ")");
    },
    onModelLoadStarted: function () {
        Log.log("Transcriber.onModelLoadStarted()");
    },
    onModelLoaded: function () {
        Log.log("Transcriber.onModelLoaded()");
    },
    onTranscribeStarted: function () {
        Log.log("Transcriber.onTranscribeStarted()");
    },
    onTranscribeStopped: function () {
        Log.log("Transcriber.onTranscribeStopped()");
    },
    onTranscriptionUpdated: function (text: string | undefined) {
        Log.log("Transcriber.onTranscriptionUpdated(" + text + ")");
    },
    onTranscriptionCommitted: function (text: string | undefined) {
        Log.log("Transcriber.onTranscriptionCommitted(" + text + ")");
    },
    onSpeechStart: function () {
        Log.log("Transcriber.onSpeechStart()");
    },
    onSpeechEnd: function () {
        Log.log("Transcriber.onSpeechEnd()");
    },
};

/**
 * Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.
 *
 * Read more about working with MediaStreams: {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream}
 */
class Transcriber {
    private vadModel: AudioNodeVAD;
    static model: MoonshineModel;
    callbacks: TranscriberCallbacks;

    private frameBuffer: Float32Array;
    private useVAD: boolean;
    private mediaStream: MediaStream;

    protected audioContext: AudioContext;
    public isActive: boolean = false;
    private previousFrameCount: number = 0;
    private frameCountInterval;

    /**
     * Creates a transcriber for transcribing a MediaStream from any source. After creating the {@link Transcriber}, you must invoke
     * {@link Transcriber.attachStream} to provide a MediaStream that you want to transcribe.
     *
     * @param modelURL The URL that the underlying {@link MoonshineModel} weights should be loaded from,
     * relative to {@link Settings.BASE_ASSET_PATH.MOONSHINE}.
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
     * import Transcriber from "@usefulsensors/moonshine-js";
     *
     * var transcriber = new Transcriber(
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
        this.callbacks = { ...defaultTranscriberCallbacks, ...callbacks };
        Transcriber.model = new MoonshineModel(modelURL);
        this.useVAD = useVAD;
        this.audioContext = new AudioContext();
        this.previousFrameCount = 0;
    }

    async load() {
        this.callbacks.onModelLoadStarted();
        await Transcriber.model.loadModel();

        // behavior
        // useVAD:  commit every 30s or onSpeechEnd
        // !useVAD: update every updateInterval frames; commit on maxFrames

        // maximum before committing and clearing buffer
        const commitInterval = this.useVAD
            ? Settings.VAD_COMMIT_INTERVAL
            : Settings.STREAM_COMMIT_INTERVAL;

        this.flushBuffer();

        var frameCount = 0;
        var isTalking = false;

        const onFrameProcessed = (probs, frame) => {
            if (isTalking) {
                if (frameCount <= commitInterval) {
                    this.frameBuffer.set(
                        frame,
                        frameCount * Settings.FRAME_SIZE
                    );
                    frameCount += 1;
                }
                if (frameCount > 0) {
                    // update
                    if (
                        !this.useVAD &&
                        frameCount < commitInterval &&
                        frameCount % Settings.STREAM_UPDATE_INTERVAL == 0
                    ) {
                        Transcriber.model
                            ?.generate(
                                this.frameBuffer.subarray(
                                    0,
                                    frameCount * Settings.FRAME_SIZE
                                )
                            )
                            .then((text) => {
                                this.callbacks.onTranscriptionUpdated(text);
                            });
                    }
                    // commit
                    else if (frameCount == commitInterval) {
                        // in this case we need to copy the buffer so that it doesn't get cleared before the inference happens
                        var tmpBuffer = this.frameBuffer.slice(
                            0,
                            frameCount * Settings.FRAME_SIZE
                        );
                        Transcriber.model?.generate(tmpBuffer).then((text) => {
                            // buffer is about to be cleared; commit the transcript
                            if (text) {
                                this.callbacks.onTranscriptionCommitted(text);
                            }
                        });
                    }
                }
                if (frameCount == commitInterval) {
                    // clear buffer (leave some overhang?)
                    this.flushBuffer();
                    frameCount = 0;
                }
            }
        };

        this.vadModel = await AudioNodeVAD.new(this.audioContext, {
            onFrameProcessed: onFrameProcessed,
            onVADMisfire: () => {
                Log.log("Transcriber.onVADMisfire()");
            },
            onSpeechStart: () => {
                Log.log("Transcriber.onSpeechStart()");
                this.callbacks.onSpeechStart();
                isTalking = true;
            },
            onSpeechEnd: (floatArray) => {
                Log.log("Transcriber.onSpeechEnd()");
                this.callbacks.onSpeechEnd();
                var tmpBuffer = this.frameBuffer.slice(
                    0,
                    frameCount * Settings.FRAME_SIZE
                );
                Transcriber.model?.generate(tmpBuffer).then((text) => {
                    if (text) {
                        this.callbacks.onTranscriptionCommitted(text);
                    }
                });
                isTalking = false;
                this.flushBuffer();
                frameCount = 0;
            },
            model: "v5",
            baseAssetPath: Settings.BASE_ASSET_PATH.SILERO_VAD,
            onnxWASMBasePath: Settings.BASE_ASSET_PATH.ONNX_RUNTIME,
        });
        this.attachStream(this.mediaStream);
        this.callbacks.onModelLoaded();
    }

    /**
     * Attaches a MediaStream to this {@link Transcriber} for transcription. A MediaStream must be attached before
     * starting transcription.
     *
     * @param stream A MediaStream to transcribe
     */
    public attachStream(stream: MediaStream) {
        if (stream) {
            if (this.vadModel) {
                var sourceNode = new MediaStreamAudioSourceNode(
                    this.audioContext,
                    {
                        mediaStream: stream,
                    }
                );
                this.vadModel.receive(sourceNode);
                Log.log(
                    "Transcriber.attachStream(): VAD set to receive source node from stream."
                );
            } else {
                // save stream to attach later, after loading
                this.mediaStream = stream;
            }
        }
    }

    /**
     * Detaches the MediaStream used for transcription.
     * @todo
     */
    public detachStream() {
        // TODO
    }

    /**
     * Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
     * we want to double-check the audio being input to the model while debugging.
     *
     * @returns An AudioBuffer
     */
    public getAudioBuffer(): AudioBuffer {
        const numChannels = 1;
        const audioBuffer = this.audioContext.createBuffer(
            numChannels,
            this.frameBuffer.length,
            16000
        );
        audioBuffer.getChannelData(0).set(this.frameBuffer);
        return audioBuffer;
    }

    /**
     * Starts transcription.
     *
     * if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
     * else if `useVAD === false`: generate an updated transcription every {@link Settings.STREAM_UPDATE_INTERVAL}.
     *
     * Transcription will stop when {@link stop} is called.
     *
     * Note that the {@link Transcriber} must have a MediaStream attached via {@link Transcriber.attachStream} before
     * starting transcription.
     */
    async start() {
        if (!this.isActive) {
            this.isActive = true;

            // load model if not loaded
            if (!Transcriber.model.isLoaded() || this.vadModel === undefined) {
                await this.load();
            }

            this.callbacks.onTranscribeStarted();
            this.vadModel.start();
            // We've been seeing odd intermittent issues with Chrome where sometimes
            // the audio worklet node isn't receiving audio frames at all. To detect
            // this, we'll check the frame count every 2 seconds and see if it's
            // increasing. If it's not, we'll log an error, and the client can
            // decide what to do. We've been unable to consistently reproduce this
            // unfortunately, and we've not seen this in Firefox or Safari.
            this.frameCountInterval = setInterval(() => {
                let currentFrameCount =
                    this.vadModel.getRawAudioFramesReceivedCount();
                let newFrameCount = currentFrameCount - this.previousFrameCount;
                this.previousFrameCount = currentFrameCount;
                if (newFrameCount <= 0) {
                    this.callbacks.onError(
                        MoonshineError.NotReceivingAudioInput
                    );
                } else {
                    Log.log(
                        `VAD newFrameCount = ${newFrameCount} since last poll`
                    );
                }
            }, 2000);
        }
    }

    /**
     * Stops transcription.
     */
    stop() {
        this.isActive = false;
        this.callbacks.onTranscribeStopped();
        if (this.vadModel) {
            this.vadModel.pause();
        }
        clearInterval(this.frameCountInterval);
    }

    private flushBuffer() {
        this.frameBuffer = new Float32Array(
            (this.useVAD
                ? Settings.VAD_COMMIT_INTERVAL
                : Settings.STREAM_COMMIT_INTERVAL) * Settings.FRAME_SIZE
        );
    }
}

export { Transcriber, TranscriberCallbacks };
