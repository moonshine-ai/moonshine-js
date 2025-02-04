interface TranscriberCallbacks {
    onModelLoadStarted: () => any;

    onTranscribeStarted: () => any;

    onTranscribeStopped: () => any;

    onTranscriptionUpdated: (text: string | undefined) => any;

    onTranscriptionCommitted: (text: string | undefined) => any;
}

const defaultTranscriberCallbacks: TranscriberCallbacks = {
    onModelLoadStarted() {
        console.log("Transcriber.onModelLoadStarted()");
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
    static modelURL: string;
    callbacks: TranscriberCallbacks;

    public constructor(
        callbacks: Partial<TranscriberCallbacks> = {},
        modelURL: string
    ) {
        this.callbacks = { ...defaultTranscriberCallbacks, ...callbacks };
        Transcriber.modelURL = modelURL;
    }

    abstract start(): void;
    abstract stop(): void;
}

export { TranscriberCallbacks, Transcriber };
