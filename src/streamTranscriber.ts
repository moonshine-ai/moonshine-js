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
    protected mediaRecorder: MediaRecorder | undefined = undefined;
    protected audioContext: AudioContext | undefined = undefined;
    private audioBuffer: AudioBuffer | undefined = undefined;
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
        if (useVAD) {
            this.audioContext = new AudioContext();
            AudioNodeVAD.new(this.audioContext, {
                onFrameProcessed: (probabilities, frame) => {},
                onVADMisfire: () => {
                    Log.log("StreamTranscriber.onVADMisfire()");
                },
                onSpeechStart: () => {
                    Log.log("StreamTranscriber.onSpeechStart()");
                    this.callbacks.onSpeechStart();
                },
                onSpeechEnd: (floatArray) => {
                    Log.log("StreamTranscriber.onSpeechEnd()");
                    this.callbacks.onSpeechEnd();
                    Transcriber.model?.generate(floatArray).then((text) => {
                        this.callbacks.onTranscriptionUpdated(text);
                        this.callbacks.onTranscriptionCommitted(
                            this.committedTranscript
                        );
                        this.committedTranscript += " " + text;
                    });
                },
            }).then((vad) => {
                this.voiceActivityDetector = vad;
            });
        } else {
            this.audioContext = new AudioContext({
                sampleRate: 16000,
            });
        }
    }

    /**
     * Attaches a MediaStream to this {@link StreamTranscriber} for transcription. A MediaStream must be attached before
     * starting transcription.
     *
     * @param stream A MediaStream to transcribe
     */
    public attachStream(stream: MediaStream) {
        this.mediaRecorder = new MediaRecorder(stream);
        if (this.voiceActivityDetector) {
            var sourceNode = new MediaStreamAudioSourceNode(this.audioContext, {
                mediaStream: stream,
            });
            this.voiceActivityDetector.receive(sourceNode);
        }
    }

    /**
     * Detaches the MediaStream used for transcription.
     */
    public detachStream() {
        if (this.mediaRecorder) {
            this.stop();
            this.mediaRecorder.stream.getTracks().forEach((t) => t.stop());
            this.mediaRecorder = undefined;
        }
    }

    /**
     * Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
     * we want to double-check the audio being input to the model while debugging.
     *
     * @returns An AudioBuffer
     */
    public getAudioBuffer(): AudioBuffer {
        return this.audioBuffer;
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
            this.isActive = true
            this.committedTranscript = "";

            // load model if not loaded
            if (!Transcriber.model.isLoaded()) {
                await super.loadModel();
            }

            // use the vad to trigger frame processing, if it exists
            if (this.voiceActivityDetector) {
                this.callbacks.onTranscribeStarted();
                this.voiceActivityDetector.start();
            }
            // otherwise process the streaming frames
            else {
                this.callbacks.onTranscribeStarted();
                let audioChunks: Blob[] = []; // buffer of audio blobs from the user mic
                let commitChunk: boolean = false; // flag to indicate whether the next generation should be committed (and buffer cleared)

                // fires every MOONSHINE_FRAME_SIZE ms
                this.mediaRecorder.ondataavailable = (event) => {
                    let bufferSecs = Math.floor(
                        (audioChunks.length * Settings.FRAME_SIZE) /
                            1000
                    );
                    if (bufferSecs >= Settings.MAX_SPEECH_SECS) {
                        // the next transcript should be "committed" and we should erase the buffer afterwards
                        commitChunk = true;
                    }
                    audioChunks.push(event.data);

                    const audioBlob = new Blob(audioChunks, {
                        type: "audio/wav",
                    });

                    audioBlob.arrayBuffer().then((arrayBuffer) => {
                        this.audioContext
                            ?.decodeAudioData(arrayBuffer)
                            .then((audioBuffer) => {
                                this.audioBuffer = audioBuffer;
                                let floatArray = new Float32Array(
                                    audioBuffer.length
                                );
                                if (floatArray.length > 16000 * 30) {
                                    floatArray = floatArray.subarray(
                                        0,
                                        16000 * 30
                                    );
                                }
                                audioBuffer.copyFromChannel(floatArray, 0);
                                Transcriber.model
                                    ?.generate(floatArray)
                                    .then((text) => {
                                        if (commitChunk && text) {
                                            this.committedTranscript =
                                                this.committedTranscript +
                                                " " +
                                                text;
                                            this.callbacks.onTranscriptionCommitted(
                                                this.committedTranscript
                                            );

                                            let headerBlob = audioChunks[0];
                                            // TODO lookback frames?
                                            audioChunks = [];
                                            audioChunks.push(headerBlob);
                                            commitChunk = false;
                                        } else if (!commitChunk) {
                                            this.callbacks.onTranscriptionUpdated(
                                                text
                                            );
                                        }
                                    });
                            })
                            .catch(() => {});
                    });
                };
            }
            this.mediaRecorder.start(Settings.FRAME_SIZE);

            let recorderTimeout = undefined;
            if (Settings.MAX_RECORD_MS) {
                recorderTimeout = setTimeout(() => {
                    this.stop();
                }, Settings.MAX_RECORD_MS);
            }

            this.mediaRecorder.onstop = () => {
                if (recorderTimeout) clearTimeout(recorderTimeout);
                this.callbacks.onTranscribeStopped();
            };
        }
    }

    /**
     * Stops transcription.
     */
    stop() {
        this.isActive = false
        if (this.voiceActivityDetector) {
            this.voiceActivityDetector.pause();
        }
        if (this.mediaRecorder) {
            this.audioBuffer = undefined;
            this.mediaRecorder.stop();
        }
    }
}

export default StreamTranscriber;
