import Log from "./log";
import MicrophoneTranscriber from "./microphoneTranscriber";

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionEventInit extends EventInit {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

// WARN not technically an event, just has the same structure as an event. this is due to
// nastiness when transpiling from ts that uses the native event class into native js
class MoonshineSpeechRecognitionEvent {
    readonly type: string;
    readonly results: SpeechRecognitionResultList;
    readonly resultIndex: number;
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    readonly composed: boolean;

    constructor(type: string, init: SpeechRecognitionEventInit) {
        this.type = type;
        this.results = init.results;
        this.resultIndex = init.resultIndex;
        this.bubbles = init.bubbles ?? false;
        this.cancelable = init.cancelable ?? false;
        this.composed = init.composed ?? false;
    }
}

class MoonshineSpeechRecognitionResult implements SpeechRecognitionResult {
    private readonly _alternatives: SpeechRecognitionAlternative[];
    readonly isFinal: boolean;

    constructor(
        alternatives: SpeechRecognitionAlternative[],
        isFinal: boolean
    ) {
        this._alternatives = alternatives;
        this.isFinal = isFinal;

        for (let i = 0; i < alternatives.length; i++) {
            (this as any)[i] = alternatives[i];
        }
    }

    get length(): number {
        return this._alternatives.length;
    }

    item(index: number): SpeechRecognitionAlternative {
        return this._alternatives[index] || null!;
    }

    [index: number]: SpeechRecognitionAlternative;
}

class MoonshineSpeechRecognitionResultList
    implements SpeechRecognitionResultList
{
    private readonly _results: SpeechRecognitionResult[];

    constructor(results: SpeechRecognitionResult[]) {
        this._results = results;

        for (let i = 0; i < results.length; i++) {
            (this as any)[i] = results[i];
        }

        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && /^\d+$/.test(prop)) {
                    return target._results[+prop];
                }
                return (target as any)[prop];
            },
        });
    }

    get length(): number {
        return this._results.length;
    }

    item(index: number): SpeechRecognitionResult {
        return this._results[index] || null!;
    }

    [index: number]: SpeechRecognitionResult;
}

class MoonshineSpeechRecognition implements SpeechRecognition {
    private transcriber: MicrophoneTranscriber;

    public constructor(modelURL: string = "model/tiny") {
        this.transcriber = new MicrophoneTranscriber(modelURL, {}, true);
    }

    continuous: boolean;
    grammars: SpeechGrammarList;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;

    removeEventListener(
        type: unknown,
        listener: unknown,
        options?: unknown
    ): void {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event: Event): boolean {
        throw new Error("Method not implemented.");
    }

    start() {
        this.transcriber.start();
    }

    stop() {
        this.transcriber.stop();
    }

    abort() {
        this.transcriber.stop();
    }

    public set onaudiostart(handler: (Event) => void) {
        Log.warn(
            "onaudiostart is not implemented for SpeechRecognition polyfill"
        );
    }

    public set onaudioend(handler: (Event) => void) {
        Log.warn(
            "onaudioend is not implemented for SpeechRecognition polyfill"
        );
    }

    public set onend(handler: (Event) => void) {
        this.transcriber.callbacks.onTranscribeStopped = () => {
            handler(new Event(""));
        };
    }

    public set onerror(handler: (SpeechRecognitionErrorEvent) => void) {
        Log.warn("onerror is not implemented for SpeechRecognition polyfill");
    }

    public set onnomatch(handler: (SpeechRecognitionEvent) => void) {
        Log.warn("nomatch is not implemented for SpeechRecognition polyfill");
    }

    resultIndex = 0;

    public set onresult(handler: (SpeechRecognitionEvent) => void) {
        this.transcriber.callbacks.onTranscriptionUpdated = (text: string) => {
            if (text || this.interimResults) {
                const res1: SpeechRecognitionAlternative = {
                    transcript: text,
                    confidence: undefined,
                };

                const result = new MoonshineSpeechRecognitionResult(
                    [res1],
                    true
                );

                const results = new MoonshineSpeechRecognitionResultList([
                    result,
                ]);

                const eventInit: SpeechRecognitionEventInit = {
                    bubbles: false,
                    cancelable: false,
                    composed: false,
                    results: results,
                    resultIndex: 0,
                };

                const e = new MoonshineSpeechRecognitionEvent(
                    "result",
                    eventInit
                );

                handler(e);
            }
        };
    }

    public set onsoundstart(handler: (Event) => void) {
        Log.warn(
            "onsoundstart is not implemented for SpeechRecognition polyfill"
        );
    }

    public set onsoundend(handler: (Event) => void) {
        Log.warn(
            "onsoundend is not implemented for SpeechRecognition polyfill"
        );
    }

    public set onspeechstart(handler: (Event) => void) {
        this.transcriber.callbacks.onSpeechStart = () => {
            handler(new Event(""));
        };
    }

    public set onspeechend(handler: (Event) => void) {
        this.transcriber.callbacks.onSpeechEnd = () => {
            handler(new Event(""));
        };
    }

    public set onstart(handler: (Event) => void) {
        this.transcriber.callbacks.onTranscribeStarted = () => {
            handler(new Event(""));
        };
    }

    addEventListener(...args: any): void {
        const handler = args[1];
        switch (args[0]) {
            case "audiostart":
                this.onaudiostart = handler;
                break;
            case "audioend":
                this.onaudioend = handler;
                break;
            case "end":
                this.onend = handler;
                break;
            case "error":
                this.onerror = handler;
                break;
            case "nomatch":
                this.onnomatch = handler;
                break;
            case "result":
                this.onresult = handler;
                break;
            case "soundstart":
                this.onsoundstart = handler;
                break;
            case "soundend":
                this.onsoundend = handler;
                break;
            case "speechstart":
                this.onspeechstart = handler;
                break;
            case "speechend":
                this.onspeechend = handler;
                break;
            case "start":
                this.onstart = handler;
                break;
        }
    }
}

export default MoonshineSpeechRecognition;
