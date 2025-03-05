import MoonshineModel from "./model";
import { Transcriber, TranscriberCallbacks } from "./transcriber";
import { MoonshineSettings } from "./constants";
import { AudioNodeVAD } from "@ricky0123/vad-web";

class StreamTranscriber extends Transcriber {
    private mediaRecorder: MediaRecorder | undefined = undefined;
    private audioContext: AudioContext | undefined = undefined;
    private audioBuffer: AudioBuffer | undefined = undefined;
    private voiceActivityDetector: AudioNodeVAD | undefined = undefined;

    /**
     * Creates a transcriber for transcribing a MediaStream from any source. After creating the {@link StreamTranscriber}, you must invoke
     * {@link StreamTranscriber.attachStream} to provide a MediaStream that you want to transcribe.
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
     * import StreamTranscriber from "@usefulsensors/moonshine-js";
     *
     * var transcriber = new StreamTranscriber(
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
        useVAD: boolean = false
    ) {
        super(modelURL, callbacks);
        if (useVAD) {
            this.audioContext = new AudioContext();
            AudioNodeVAD.new(this.audioContext, {
                onFrameProcessed: (probabilities, frame) => {
                    // console.log(
                    //     "StreamTranscriber.onFrameProcessed(" +
                    //         probabilities +
                    //         "," +
                    //         frame +
                    //         ")"
                    // );
                },
                onVADMisfire: () => {
                    console.log("StreamTranscriber.onVADMisfire()");
                },
                onSpeechStart: () => {
                    console.log("StreamTranscriber.onSpeechStart()");
                    this.callbacks.onTranscribeStarted()
                },
                onSpeechEnd: (floatArray) => {
                    console.log("StreamTranscriber.onSpeechEnd()");
                    this.callbacks.onTranscribeStopped()
                    Transcriber.model?.generate(floatArray).then((text) => {
                        this.callbacks.onTranscriptionUpdated(text)
                    })
                },
            }).then((vad) => {
                this.voiceActivityDetector = vad;
            });
        }
        else {
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
     * Note that the {@link StreamTranscriber} must have a MediaStream attached via {@link StreamTranscriber.attachStream} before
     * starting transcription.
     */
    async start() {
        if (this.mediaRecorder.state !== "recording") {
            // load model if not loaded
            if (!Transcriber.model.isLoaded()) {
                await super.loadModel();
            }

            // use the vad to trigger frame processing, if it exists
            if (this.voiceActivityDetector) {
                this.voiceActivityDetector.start();
            }
            // otherwise process the streaming frames
            else {
                let audioChunks: Blob[] = []; // buffer of audio blobs from the user mic
                let commitChunk: boolean = false; // flag to indicate whether the next generation should be committed (and buffer cleared)
                let transcript: string = ""; // running transcript collected from subsequent buffers

                // fires every MOONSHINE_FRAME_SIZE ms
                this.mediaRecorder.ondataavailable = (event) => {
                    let bufferSecs = Math.floor(
                        (audioChunks.length * MoonshineSettings.FRAME_SIZE) /
                            1000
                    );
                    if (bufferSecs >= MoonshineSettings.MAX_SPEECH_SECS) {
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
                                Transcriber.model?.generate(floatArray).then((text) => {
                                    this.callbacks.onTranscriptionUpdated(text);
                                    if (text) {
                                        if (commitChunk) {
                                            transcript =
                                                transcript + " " + text;
                                            this.callbacks.onTranscriptionCommitted(
                                                transcript
                                            );

                                            let headerBlob = audioChunks[0];
                                            // TODO lookback frames?
                                            audioChunks = [];
                                            audioChunks.push(headerBlob);
                                            commitChunk = false;
                                        } else {
                                            this.callbacks.onTranscriptionCommitted(
                                                transcript + " " + text
                                            );
                                        }
                                    }
                                });
                            })
                            .catch(() => {});
                    });
                };
            }
            this.mediaRecorder.start(MoonshineSettings.FRAME_SIZE);
            this.callbacks.onTranscribeStarted();

            let recorderTimeout = undefined;
            if (MoonshineSettings.MAX_RECORD_MS) {
                recorderTimeout = setTimeout(() => {
                    this.stop();
                }, MoonshineSettings.MAX_RECORD_MS);
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
        if (this.mediaRecorder) {
            this.audioBuffer = undefined;
            this.mediaRecorder.stop();
            if (this.voiceActivityDetector) {
                this.voiceActivityDetector.pause();
            }
        }
    }
}

export default StreamTranscriber;
