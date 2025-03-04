import { TranscriberCallbacks } from "./transcriber";

type CommandHandlers = {
    [key: string]: (...args: any[]) => any;
};

abstract class VoiceController implements TranscriberCallbacks {
    commandHandlers: CommandHandlers;

    onModelLoadStarted: () => any;
    onModelLoaded: () => any;
    onTranscribeStarted: () => any;
    onTranscribeStopped: () => any;
    onTranscriptionCommitted: (text: string | undefined) => any;
    onTranscriptionUpdated: (text: string | undefined) => any;

    public constructor(
        commandHandlers: CommandHandlers,
        callbacks: Partial<TranscriberCallbacks> = {}
    ) {
        this.commandHandlers = commandHandlers;
        this.onModelLoadStarted =
            callbacks.onModelLoadStarted ??
            function () {
                console.log("VoiceController.onModelLoadStarted()");
            };
        this.onModelLoaded =
            callbacks.onModelLoaded ??
            function () {
                console.log("VoiceController.onModelLoaded()");
            };
        this.onTranscribeStarted =
            callbacks.onTranscribeStarted ??
            function () {
                console.log("VoiceController.onTranscribeStarted()");
            };
        this.onTranscribeStopped =
            callbacks.onTranscribeStopped ??
            function () {
                console.log("VoiceController.onTranscribeStopped()");
            };
        this.onTranscriptionCommitted =
            callbacks.onTranscriptionCommitted ??
            function () {
                console.log("VoiceController.onTranscriptionCommitted()");
            };
    }
}

class KeywordSpotter extends VoiceController {
    onTranscriptionUpdated = (text: string | undefined) => {
        if (text) {
            console.log("KeywordSpotter.onTranscriptionUpdated(" + text + ")");
            text = text.toLowerCase().replace(/[^\w\s]|_/g, "");
            if (this.commandHandlers[text] !== undefined) {
                this.commandHandlers[text]();
            }
        }
    };
}

class IntentClassifier extends VoiceController {
    onTranscriptionUpdated = (text: string | undefined) => {
        console.log(text);
    };
}

export { VoiceController, KeywordSpotter, IntentClassifier };
