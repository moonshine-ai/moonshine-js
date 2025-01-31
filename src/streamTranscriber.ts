import MoonshineModel from "./model";
import { Transcriber, TranscriberCallbacks } from "./transcriber";
import { MoonshineSettings } from "./constants";


class StreamTranscriber extends Transcriber {
    private static model: MoonshineModel | undefined = undefined;
    private static mediaRecorder: MediaRecorder | undefined = undefined;
    private static audioContext: AudioContext | undefined = undefined;

    public constructor(
        stream: MediaStream,
        callbacks: Partial<TranscriberCallbacks> = {},
        modelURL: string
    ) {
        super(callbacks, modelURL)
        if (!StreamTranscriber.mediaRecorder) {
            StreamTranscriber.mediaRecorder = new MediaRecorder(stream);
        }
    }

    async start() {
        if (!StreamTranscriber.audioContext) {
            StreamTranscriber.audioContext = new AudioContext({
                sampleRate: 16000,
            });
        }

        // load model if not loaded
        if (!StreamTranscriber.model) {
            this.callbacks.onModelLoadStarted();
            StreamTranscriber.model = new MoonshineModel(
                StreamTranscriber.modelURL
            );
            await StreamTranscriber.model.loadModel();
        }

        let audioChunks: Blob[] = [];       // buffer of audio blobs from the user mic
        let commitChunk: boolean = false;   // flag to indicate whether the next generation should be committed (and buffer cleared)
        let transcript: string = "";        // running transcript collected from subsequent buffers

        // fires every MOONSHINE_FRAME_SIZE ms
        StreamTranscriber.mediaRecorder.ondataavailable = (event) => {
            let bufferSecs = Math.floor((audioChunks.length * MoonshineSettings.FRAME_SIZE) / 1000)
            if (bufferSecs >= MoonshineSettings.MAX_SPEECH_SECS) {
                // the next transcript should be "committed" and we should erase the buffer afterwards
                commitChunk = true
            }
            audioChunks.push(event.data);

            const audioBlob = new Blob(audioChunks, {
                type: "audio/wav",
            });

            audioBlob.arrayBuffer().then((arrayBuffer) => {
                StreamTranscriber.audioContext
                    ?.decodeAudioData(arrayBuffer)
                    .then((decoded) => {
                        let floatArray = new Float32Array(decoded.length);
                        if (floatArray.length > 16000 * 30) {
                            floatArray = floatArray.subarray(0, 16000 * 30);
                        }
                        decoded.copyFromChannel(floatArray, 0);
                        StreamTranscriber.model
                            ?.generate(floatArray)
                            .then((text) => {
                                if (text) {
                                    if (commitChunk) {
                                        transcript = transcript + " " + text
                                        this.callbacks.onTranscriptionUpdated(transcript);

                                        let headerBlob = audioChunks[0]
                                        // TODO lookback frames?
                                        audioChunks = []
                                        audioChunks.push(headerBlob)
                                        commitChunk = false
                                    }
                                    else {
                                        this.callbacks.onTranscriptionUpdated(transcript + " " + text);
                                    }
                                }
                            });
                    })
                    .catch(() => {});
            });
        };

        StreamTranscriber.mediaRecorder.start(MoonshineSettings.FRAME_SIZE);
        this.callbacks.onTranscribeStarted();

        const recorderTimeOut = setTimeout(() => {
            this.stop();
        }, MoonshineSettings.MAX_RECORD_MS);

        StreamTranscriber.mediaRecorder.onstop = () => {
            clearTimeout(recorderTimeOut);
            this.callbacks.onTranscribeStopped();
        };
    }

    /**
     * Stops transcription.
     */
    stop() {
        if (StreamTranscriber.mediaRecorder) {
            StreamTranscriber.mediaRecorder.stop();
        }
    }
}

export default StreamTranscriber;
