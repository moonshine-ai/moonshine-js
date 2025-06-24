import { Settings } from "./constants";
import MoonshineModel from "./model";
import MoonshineError from "./error";
import { AudioNodeVAD } from "@ricky0123/vad-web";
import Log from "./log";

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

    onTranscriptionCommitted: (text: string, buffer?: AudioBuffer) => any;

    onFrame: (probs, frame, ema) => any;

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
    onTranscriptionUpdated: function (text: string) {
        Log.log("Transcriber.onTranscriptionUpdated(" + text + ")");
    },
    onTranscriptionCommitted: function (text: string, buffer?: AudioBuffer) {
        Log.log("Transcriber.onTranscriptionCommitted(" + text + ")");
    },
    onFrame: function (probs, frame, ema) {
        Log.log("Transcriber.onFrame()");
    },
    onSpeechStart: function () {
        Log.log("Transcriber.onSpeechStart()");
    },
    onSpeechEnd: function () {
        Log.log("Transcriber.onSpeechEnd()");
    },
};

class SpeechBuffer {
    private buffer: Float32Array;
    private frameCount: number;
    public frameEMA: number;
    private speechEMA: (value: number) => any;
    private useVAD: boolean;

    constructor(useVAD: boolean) {
        this.useVAD = useVAD;
        this.flush();
    }

    public flush(): void {
        this.buffer = new Float32Array(
            this.maxCommitInterval() * Settings.FRAME_SIZE
        );
        this.speechEMA = this.ema(Settings.STREAM_COMMIT_EMA_PERIOD);
        this.frameEMA = 0.0;
        this.frameCount = 0;
    }

    public set(frame, p = undefined): void {
        this.buffer.set(frame, this.frameCount * Settings.FRAME_SIZE);
        if (p) this.updateEMA(p);
        this.frameCount += 1;
    }

    public updateEMA(p): void {
        this.frameEMA = this.speechEMA(p.isSpeech);
    }

    public subarray(): Float32Array {
        return this.buffer.subarray(0, this.frameCount * Settings.FRAME_SIZE);
    }

    public copy(): Float32Array {
        return this.buffer.slice(0, this.frameCount * Settings.FRAME_SIZE);
    }

    public hasFrames(): boolean {
        return this.frameCount > 0;
    }

    public shouldSet(): boolean {
        return this.frameCount <= this.maxCommitInterval();
    }

    public shouldUpdate(): boolean {
        return (
            this.frameCount < this.maxCommitInterval() &&
            this.frameCount % Settings.STREAM_UPDATE_INTERVAL === 0
        );
    }

    public shouldCommit(): boolean {
        if (
            this.frameEMA <= 0.5 &&
            this.frameCount >= this.minCommitInterval() &&
            this.frameCount < this.maxCommitInterval()
        ) {
            Log.log(`Speech pause, frameCount: ${this.frameCount}`);
        } else if (this.frameCount === this.maxCommitInterval()) {
            Log.log(`Forced commit, frameCount: ${this.frameCount}`);
        }
        return (
            this.frameCount === this.maxCommitInterval() ||
            (this.frameEMA <= 0.5 &&
                this.frameCount >= this.minCommitInterval())
        );
    }

    private ema(period: number): (value: number) => number {
        const k = 2 / (period + 1);
        let emaPrev = null;

        return function update(value: number): number {
            if (emaPrev === null) {
                emaPrev = value; // initialize with first value
            } else {
                emaPrev = value * k + emaPrev * (1 - k);
            }
            return emaPrev;
        };
    }

    private minCommitInterval(): number {
        return Settings.STREAM_COMMIT_MIN_INTERVAL;
    }

    private maxCommitInterval(): number {
        return this.useVAD
            ? Settings.VAD_COMMIT_INTERVAL
            : Settings.STREAM_COMMIT_MAX_INTERVAL;
    }
}

/**
 * Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.
 *
 * Read more about working with MediaStreams: {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream}
 */
class Transcriber {
    private static models: Map<string, MoonshineModel> = new Map();
    private sttModel: MoonshineModel;
    private vadModel: AudioNodeVAD;
    callbacks: TranscriberCallbacks;

    private useVAD: boolean;
    private mediaStream: MediaStream;
    private speechBuffer: SpeechBuffer;

    protected audioContext: AudioContext;
    public isActive: boolean = false;

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
        // we want to avoid re-downloading the same model weights if we can avoid it
        // so we only create a new model of the requested type if it hasn't been already
        if (!Transcriber.models.has(modelURL))
            Transcriber.models.set(modelURL, new MoonshineModel(modelURL));
        this.sttModel = Transcriber.models.get(modelURL);
        this.useVAD = useVAD;
        this.audioContext = new AudioContext();
    }

    public async load() {
        this.callbacks.onModelLoadStarted();
        try {
            await this.sttModel.loadModel();
        } catch (err) {
            this.callbacks.onError(MoonshineError.PlatformUnsupported);
            throw err;
        }

        // behavior
        // useVAD:  commit every 30s or onSpeechEnd
        // !useVAD: update every updateInterval frames; commit on detected pause (w/ EMA below threshold) occurring between min and max interval OR on max.
        this.speechBuffer = new SpeechBuffer(this.useVAD);
        var isTalking = false;

        const onFrameProcessed = (p, frame) => {
            this.speechBuffer.updateEMA(p);
            this.callbacks.onFrame(p, frame, this.speechBuffer.frameEMA);
            if (isTalking) {
                if (this.speechBuffer.shouldSet()) {
                    this.speechBuffer.set(frame);
                }
                if (this.speechBuffer.hasFrames()) {
                    // update
                    if (
                        !this.useVAD &&
                        this.speechBuffer.shouldUpdate() &&
                        !this.speechBuffer.shouldCommit()
                    ) {
                        this.sttModel
                            ?.generate(this.speechBuffer.subarray())
                            .then((text) => {
                                this.callbacks.onTranscriptionUpdated(text);
                            })
                            .catch(() => {
                                Log.error("Generation misfire.");
                            });
                    }
                    // commit
                    else if (this.speechBuffer.shouldCommit()) {
                        // in this case we need to copy the buffer so that it doesn't get cleared before the inference happens
                        var tmpBuffer = this.speechBuffer.copy();
                        this.sttModel
                            ?.generate(tmpBuffer)
                            .then((text) => {
                                // buffer is about to be cleared; commit the transcript
                                if (text) {
                                    this.callbacks.onTranscriptionCommitted(
                                        text,
                                        this.getAudioBuffer(tmpBuffer)
                                    );
                                }
                            })
                            .catch(() => {
                                Log.error("Generation misfire.");
                            });
                    }
                }
                if (this.speechBuffer.shouldCommit()) {
                    // clear buffer (leave some overhang?)
                    this.speechBuffer.flush();
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
                var tmpBuffer = this.speechBuffer.copy();
                this.sttModel?.generate(tmpBuffer).then((text) => {
                    if (text) {
                        this.callbacks.onTranscriptionCommitted(
                            text,
                            this.getAudioBuffer(tmpBuffer)
                        );
                    }
                });
                this.speechBuffer.flush();
                isTalking = false;
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
    public getAudioBuffer(buffer: Float32Array): AudioBuffer {
        const numChannels = 1;
        const audioBuffer = this.audioContext.createBuffer(
            numChannels,
            buffer.length,
            16000
        );
        audioBuffer.getChannelData(0).set(buffer);
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
    public async start() {
        if (!this.isActive) {
            this.isActive = true;

            // load model if not loaded
            if (
                (!this.sttModel.isLoaded() && !this.sttModel.isLoading()) ||
                this.vadModel === undefined
            ) {
                await this.load();
            }

            this.callbacks.onTranscribeStarted();
            this.vadModel.start();
            this.audioContext.resume();
            setTimeout(() => {
                if (this.audioContext.state === "suspended") {
                    Log.warn(
                        "AudioContext is suspended, this usually happens on Chrome when you start trying to access an audio source (like a microphone or video) before the user has interacted with the page. Chrome blocks access until there has been a user gesture, so you'll need to rework your code to call start() after an interaction."
                    );
                }
            }, 1000);
        }
    }

    /**
     * Stops transcription.
     */
    public stop() {
        this.isActive = false;
        this.callbacks.onTranscribeStopped();
        if (this.vadModel) {
            this.vadModel.pause();
        }
    }
}

export { Transcriber, TranscriberCallbacks };
