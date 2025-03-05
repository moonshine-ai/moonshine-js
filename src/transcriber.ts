import MoonshineModel from "./model";

/**
 * {@link TranscriberCallbacks} are invoked at different phases of the lifecycle as audio is transcribed.
 * By defining custom callbacks, you can control the behavior of the application in response to model loading,
 * starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.
 *
 * @property onModelLoadStarted() - called when the {@link MoonshineModel} begins to load (or download, if hosted elsewhere)
 *
 * @property onModelLoaded() - called when the {@link MoonshineModel} is loaded. This means the Transcriber is now ready to use.
 *
 * @property onTranscribeStarted() - called once when transcription starts
 *
 * @property onTranscribeStopped() - called once when transcription stops
 *
 * @property onTranscriptionUpdated(text) - called every {@link MoonshineSettings.FRAME_SIZE} milliseconds while
 * transcription is active. Use this callback when you don't need long-running transcription - you only care about
 * the most-recent transcription output. Note that the transcription output may be empty in cases where no speech was detected.
 *
 * @property onTranscriptionCommitted(text) - called every {@link MoonshineSettings.FRAME_SIZE} milliseconds while
 * transcription is active, and every {@link MoonshineSettings.MAX_SPEECH_SECS} when the transcription is "committed",
 * i.e., the underlying audio buffer is emptied and the model begins inferences on a fresh buffer. Use this callback
 * for a long-running transcription of audio.
 *
 * @interface
 */
interface TranscriberCallbacks {
    onModelLoadStarted: () => any;

    onModelLoaded: () => any;

    onTranscribeStarted: () => any;

    onTranscribeStopped: () => any;

    onTranscriptionUpdated: (text: string | undefined) => any;

    onTranscriptionCommitted: (text: string | undefined) => any;
}

const defaultTranscriberCallbacks: TranscriberCallbacks = {
    onModelLoadStarted: function () {
        console.log("Transcriber.onModelLoadStarted()");
    },
    onModelLoaded: function () {
        console.log("Transcriber.onModelLoaded()");
    },
    onTranscribeStarted: function () {
        console.log("Transcriber.onTranscribeStarted()");
    },
    onTranscribeStopped: function () {
        console.log("Transcriber.onTranscribeStopped()");
    },
    onTranscriptionUpdated: function (text: string | undefined) {
        console.log("Transcriber.onTranscriptionUpdated(" + text + ")");
    },
    onTranscriptionCommitted: function (text: string | undefined) {
        console.log("Transcriber.onTranscriptionCommitted(" + text + ")");
    },
};

abstract class Transcriber {
    static model: MoonshineModel;
    callbacks: TranscriberCallbacks;

    public constructor(
        modelURL: string,
        callbacks: Partial<TranscriberCallbacks> = {}
    ) {
        this.callbacks = { ...defaultTranscriberCallbacks, ...callbacks };
        Transcriber.model = new MoonshineModel(modelURL);
    }

    abstract start(): void;
    abstract stop(): void;
    async loadModel() {
        this.callbacks.onModelLoadStarted();
        await Transcriber.model.loadModel();
        this.callbacks.onModelLoaded();
    }
}

export { TranscriberCallbacks, Transcriber };
