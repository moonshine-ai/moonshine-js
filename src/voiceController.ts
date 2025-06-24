import { TranscriberCallbacks } from "./transcriber";
import { pipeline } from "@huggingface/transformers";
import Log from "./log";

type CommandHandlers = {
    [key: string]: (...args: any[]) => any;
};

/**
 * An interface for invoking voice-controlled actions on a page using speech transcribed by a {@link Transcriber}.
 */
abstract class VoiceController implements TranscriberCallbacks {
    commandHandlers: CommandHandlers;

    onPermissionsRequested: () => any;
    onError: (error) => any;
    onModelLoadStarted: () => any;
    onModelLoaded: () => any;
    onTranscribeStarted: () => any;
    onTranscribeStopped: () => any;
    onTranscriptionCommitted: (text: string) => any;
    onTranscriptionUpdated: (text: string) => any;
    onFrame: (probs, frame, ema) => any;
    onSpeechStart: () => any;
    onSpeechEnd: () => any;

    public constructor(
        commandHandlers: CommandHandlers,
        callbacks: Partial<TranscriberCallbacks> = {}
    ) {
        this.commandHandlers = commandHandlers;
        this.onPermissionsRequested =
            callbacks.onPermissionsRequested ??
            function () {
                Log.log("VoiceController.onPermissionsRequested()");
            };
        this.onError =
            callbacks.onError ??
            function (error) {
                Log.error("VoiceController.onError(" + error + ")");
            };
        this.onModelLoadStarted =
            callbacks.onModelLoadStarted ??
            function () {
                Log.log("VoiceController.onModelLoadStarted()");
            };
        this.onModelLoaded =
            callbacks.onModelLoaded ??
            function () {
                Log.log("VoiceController.onModelLoaded()");
            };
        this.onTranscribeStarted =
            callbacks.onTranscribeStarted ??
            function () {
                Log.log("VoiceController.onTranscribeStarted()");
            };
        this.onTranscribeStopped =
            callbacks.onTranscribeStopped ??
            function () {
                Log.log("VoiceController.onTranscribeStopped()");
            };
        this.onTranscriptionCommitted =
            callbacks.onTranscriptionCommitted ??
            function () {
                Log.log("VoiceController.onTranscriptionCommitted()");
            };
        this.onFrame =
            callbacks.onFrame ??
            function () {
                Log.log("VoiceController.onFrame()");
            };
        this.onSpeechStart =
            callbacks.onSpeechStart ??
            function () {
                Log.log("VoiceController.onSpeechStart()");
            };
        this.onSpeechEnd =
            callbacks.onSpeechEnd ??
            function () {
                Log.log("VoiceController.onSpeechEnd()");
            };
    }

    public static normalizeText(text: string) {
        return text.toLowerCase().replace(/[^\w\s]|_/g, "");
    }
}

/**
 * Implements voice control using basic keyword spotting.
 *
 * Keyword spotting is most useful in cases where we need to match EXACT user command phrases to actions
 * with no ambiguity, e.g., matching the exact words "scroll up" to a scroll up action.
 */
class KeywordSpotter extends VoiceController {
    onTranscriptionUpdated = (text: string) => {
        if (text) {
            Log.log("KeywordSpotter.onTranscriptionUpdated(" + text + ")");
            text = VoiceController.normalizeText(text);
            if (this.commandHandlers[text] !== undefined) {
                this.commandHandlers[text]();
            }
        }
    };
}

/**
 * Implements voice control using intent classification.
 *
 * Intent classification matches user commands to actions using semantic similarity. This is most useful
 * when we want to match commands with similar meaning (but not identical wordings) to desired actions, e.g.,
 * matching the commands to "start up", "initialize", and "boot it up" to an intent named "turn on".
 */
class IntentClassifier extends VoiceController {
    private featureExtractor;
    private preComputedEmbeddings;

    private static cosineSimilarity(A, B) {
        var dotproduct = 0;
        var mA = 0;
        var mB = 0;

        for (var i = 0; i < A.length; i++) {
            dotproduct += A[i] * B[i];
            mA += A[i] * A[i];
            mB += B[i] * B[i];
        }

        mA = Math.sqrt(mA);
        mB = Math.sqrt(mB);
        var similarity = dotproduct / (mA * mB);

        return similarity;
    }

    private static maxIndex(arr) {
        if (arr.length === 0) {
            return -1;
        }

        var max = arr[0];
        var maxIndex = 0;

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }

        return maxIndex;
    }

    /**
     * @param text
     * @returns
     */
    public async getEmbeddings(text: string) {
        const out = await this.featureExtractor(text, {
            pooling: "mean",
            normalize: true,
        });
        return out["ort_tensor"].cpuData;
    }

    /**
     *
     * @param intents
     * @returns
     */
    public async getAllEmbeddings(intents: string[]) {
        let allEmbeddings = [];
        for (var i = 0; i < intents.length; i++) {
            var vec = await this.getEmbeddings(intents[i]);
            allEmbeddings.push(vec);
        }
        return allEmbeddings;
    }

    /**
     *
     * @param embeddings
     * @returns
     */
    public getCosineSimilarityScores(embeddings, allEmbeddings) {
        var scores = [];
        allEmbeddings.forEach((a) => {
            scores.push(IntentClassifier.cosineSimilarity(embeddings, a));
        });
        return scores;
    }

    /**
     *
     * @param text
     * @param candidates
     * @returns
     */
    public async getMostSimilar(text: string, candidates: string[]) {
        const textEmbeddings = await this.getEmbeddings(text);
        const candidateEmbeddings = await this.getAllEmbeddings(candidates);
        const scores = this.getCosineSimilarityScores(
            textEmbeddings,
            candidateEmbeddings
        );
        return candidates[IntentClassifier.maxIndex(scores)];
    }

    /**
     *
     * @param text
     * @returns
     */
    public async getIntent(text: string): Promise<string> {
        var embeddings = await this.getEmbeddings(text);
        var scores = this.getCosineSimilarityScores(
            embeddings,
            this.preComputedEmbeddings
        );
        Log.log("getIntent() => " + text + " " + scores);
        return Object.keys(this.commandHandlers)[
            IntentClassifier.maxIndex(scores)
        ];
    }

    /**
     *
     * @param commandHandlers
     * @param callbacks
     * @param embeddingsModel
     * @param preComputedEmbeddings
     */
    public constructor(
        commandHandlers: CommandHandlers,
        callbacks: Partial<TranscriberCallbacks> = {},
        embeddingsModel: string = "Xenova/all-MiniLM-L6-v2",
        preComputedEmbeddings: string | undefined = undefined
    ) {
        super(commandHandlers, callbacks);
        pipeline("feature-extraction", embeddingsModel).then((pipe) => {
            this.featureExtractor = pipe;
            if (preComputedEmbeddings === undefined) {
                this.getAllEmbeddings(Object.keys(commandHandlers)).then(
                    (result) => {
                        this.preComputedEmbeddings = result;
                    }
                );
            } else {
                // TODO instead fetch this from a url to some json
                this.preComputedEmbeddings = preComputedEmbeddings;
            }
        });
    }

    onTranscriptionUpdated = (text: string) => {
        if (text) {
            this.getIntent(text).then((intent) => {
                this.commandHandlers[intent](
                    VoiceController.normalizeText(text),
                    this
                );
            });
        }
    };
}

export { VoiceController, KeywordSpotter, IntentClassifier };
