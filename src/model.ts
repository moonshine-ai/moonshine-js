import * as ort from "onnxruntime-web";
import llamaTokenizer from "llama-tokenizer-js";
import { MoonshineSettings } from "./constants";

function argMax(array) {
    return [].map
        .call(array, (x, i) => [x, i])
        .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

/**
 * Implements speech-to-text inferences with Moonshine models using `onnxruntime-web`.
 */
export default class MoonshineModel {
    private modelURL: string;
    private precision: string;
    private model: any;

    private shape: any;
    private decoderStartTokenID: number = 1;
    private eosTokenID: number = 2;

    private lastLatency: number | undefined = undefined;

    /**
     * Create (but do not load) a new MoonshineModel for inference.
     *
     * @param modelURL A string (relative to {@link MoonshineSettings.BASE_ASSET_PATH}) where the `.onnx` model weights are located.
     *
     * @remarks Creating a MoonshineModel has the side effect of setting the path to the `onnxruntime-web` `.wasm` to the {@link MoonshineSettings.BASE_ASSET_PATH}
     */
    public constructor(modelURL: string, precision: string = "quantized") {
        this.modelURL = MoonshineSettings.BASE_ASSET_PATH + modelURL;
        this.precision = precision;
        ort.env.wasm.wasmPaths = MoonshineSettings.BASE_ASSET_PATH;
        this.model = {
            encoder: undefined,
            decoder: undefined,
        };
        if (this.modelURL.includes("tiny")) {
            this.shape = {
                numLayers: 6,
                numKVHeads: 8,
                headDim: 36,
            };
        } else if (this.modelURL.includes("base")) {
            this.shape = {
                numLayers: 8,
                numKVHeads: 8,
                headDim: 52,
            };
        }
    }

    private static getSessionOption() {
        let sessionOption;

        // check for webgpu support
        // if (!!navigator.gpu) {
        //     sessionOption = {
        //         executionProviders: ["webgpu"],
        //         preferredOutputLocation: "gpu-buffer",
        //     };
        // }
        // otherwise check for webgl support
        // NOTE onnxruntime-web does not support the necessary ops for moonshine on webgl
        // else if (
        //     (function () {
        //         const canvas = document.createElement("canvas");
        //         return !!(
        //             canvas.getContext("webgl") || canvas.getContext("webgl2")
        //         );
        //     })()
        // ) {
        //     sessionOption = {
        //         executionProviders: ["webgl"]
        //     };
        // }
        // otherwise use cpu
        //else {
        sessionOption = {
            executionProviders: ["wasm", "cpu"],
        };
        //}
        return sessionOption;
    }

    /**
     * Tests the inference latency of the current environment. This is useful for determining the appropriate
     * {@link MoonshineSettings.FRAME_SIZE} and {@link MoonshineSettings.MAX_SPEECH_SECS} for a given execution environment.
     *
     * @param sampleSize (Optional) The number of samples to use for computing the benchmark
     *
     * @returns The average inference latency (in ms) over the number of samples taken.
     */
    public async benchmarkExecutionEnvironment(
        sampleSize: number = 10
    ): Promise<number> {
        var samples = [];
        const noiseBuffer = new Float32Array(16000);
        for (var i = 0; i < sampleSize; i++) {
            // fill the buffer with noise
            for (let j = 0; j < length; j++) {
                noiseBuffer[j] = Math.random() * 2 - 1;
            }
            await this.generate(noiseBuffer);
            samples.push(this.lastLatency);
        }
        return samples.reduce((sum, num) => sum + num, 0) / sampleSize;
    }

    /**
     * Returns the latency (in ms) of the last call to {@link MoonshineModel.generate}
     * @returns A latency reading (in ms)
     */
    public getLatency(): number {
        return this.lastLatency;
    }

    /**
     * Load the model weights.
     */
    public async loadModel() {
        const sessionOption = MoonshineModel.getSessionOption();
        console.log(
            "MoonshineModel.loadModel: Using executionProviders: " +
                sessionOption.executionProviders
        );

        this.model.encoder = await ort.InferenceSession.create(
            this.modelURL + "/" + this.precision + "/encoder_model.onnx",
            sessionOption
        );

        this.model.decoder = await ort.InferenceSession.create(
            this.modelURL + "/" + this.precision + "/decoder_model_merged.onnx",
            sessionOption
        );
    }

    /**
     * Returns whether or not the model weights have been loaded.
     * @returns true if the model is loaded, false if not.
     */
    public isLoaded(): boolean {
        return this.model.encoder && this.model.decoder;
    }

    /**
     * Generate a transcription of the passed audio.
     * @param audio A Float32Array containing raw audio samples from an audio source (e.g., a wav file, or a user's microphone)
     * @returns A Promise that resolves with the generated transcription.
     */
    public async generate(audio: Float32Array): Promise<string> {
        if (this.isLoaded()) {
            const t0 = performance.now();
            const maxLen = Math.trunc((audio.length / 16000) * 6);

            const encoderOutput = await this.model.encoder.run({
                input_values: new ort.Tensor("float32", audio, [
                    1,
                    audio.length,
                ]),
            });

            var pastKeyValues = Object.fromEntries(
                Array.from({ length: this.shape.numLayers }, (_, i) =>
                    ["decoder", "encoder"].flatMap((a) =>
                        ["key", "value"].map((b) => [
                            `past_key_values.${i}.${a}.${b}`,
                            new ort.Tensor(
                                "float32",
                                [],
                                [
                                    0,
                                    this.shape.numKVHeads,
                                    1,
                                    this.shape.headDim,
                                ]
                            ),
                        ])
                    )
                ).flat()
            );

            var tokens = [this.decoderStartTokenID];
            var inputIDs = [tokens];

            for (let i = 0; i < maxLen; i++) {
                var decoderInput = {
                    // @ts-expect-error
                    input_ids: new ort.Tensor("int64", inputIDs, [
                        1,
                        inputIDs.length,
                    ]),
                    encoder_hidden_states: encoderOutput.last_hidden_state,
                    use_cache_branch: new ort.Tensor("bool", [i > 0]),
                };
                Object.assign(decoderInput, pastKeyValues);
                var decoderOutput = await this.model.decoder.run(decoderInput);

                var logits = await decoderOutput.logits.getData();
                var nextToken = argMax(logits);
                tokens.push(nextToken);

                if (nextToken == this.eosTokenID) break;
                inputIDs = [[nextToken]];

                const presentKeyValues = Object.entries(decoderOutput)
                    .filter(([key, _]) => key.includes("present"))
                    .map(([_, value]) => value);

                Object.keys(pastKeyValues).forEach((k, index) => {
                    const v = presentKeyValues[index];
                    if (!(i > 0) || k.includes("decoder")) {
                        pastKeyValues[k] = v;
                    }
                });
            }
            this.lastLatency = performance.now() - t0;
            return llamaTokenizer.decode(tokens.slice(0, -1));
        } else {
            console.warn(
                "MoonshineModel.generate(): Tried to call generate before the model was loaded."
            );
        }
    }
}
