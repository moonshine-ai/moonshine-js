undefined
# Class: MoonshineModel

Defined in: [model.ts:14](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L14)

Implements speech-to-text inferences with Moonshine models.

## Constructors

### new MoonshineModel()

```ts
new MoonshineModel(modelURL, precision): MoonshineModel
```

Defined in: [model.ts:32](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L32)

Create (but do not load) a new MoonshineModel for inference.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` | A string (relative to [MoonshineSettings.BASE\_ASSET\_PATH](/docs/api/variables/moonshinesettings#base_asset_path)) where the `.onnx` model weights are located. |
| `precision` | `string` | `"quantized"` | - |

#### Returns

[`MoonshineModel`](/docs/api/classes/moonshinemodel)

#### Remarks

Creating a MoonshineModel has the side effect of setting the path to the `onnxruntime-web` `.wasm` to the [MoonshineSettings.BASE\_ASSET\_PATH](/docs/api/variables/moonshinesettings#base_asset_path)

## Methods

### benchmarkExecutionEnvironment()

```ts
benchmarkExecutionEnvironment(sampleSize): Promise<number>
```

Defined in: [model.ts:99](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L99)

Tests the inference latency of the current environment. This is useful for determining the appropriate
[MoonshineSettings.FRAME\_SIZE](/docs/api/variables/moonshinesettings#frame_size) and [MoonshineSettings.MAX\_SPEECH\_SECS](/docs/api/variables/moonshinesettings#max_speech_secs) for a given execution environment.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `sampleSize` | `number` | `10` | (Optional) The number of samples to use for computing the benchmark |

#### Returns

`Promise`\<`number`\>

The average inference latency (in ms) over the number of samples taken.

#### Remarks

Warning: since this uses noise to benchmark the model, the model will have lower performance if you to use it 
for transcription immediately after benchmarking.

***

### generate()

```ts
generate(audio): Promise<string>
```

Defined in: [model.ts:157](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L157)

Generate a transcription of the passed audio.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audio` | `Float32Array` | A Float32Array containing raw audio samples from an audio source (e.g., a wav file, or a user's microphone) |

#### Returns

`Promise`\<`string`\>

A Promise that resolves with the generated transcription.

***

### getLatency()

```ts
getLatency(): number
```

Defined in: [model.ts:119](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L119)

Returns the latency (in ms) of the most recent call to [MoonshineModel.generate](/docs/api/classes/moonshinemodel#generate)

#### Returns

`number`

A latency reading (in ms)

***

### isLoaded()

```ts
isLoaded(): boolean
```

Defined in: [model.ts:148](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L148)

Returns whether or not the model weights have been loaded.

#### Returns

`boolean`

true if the model is loaded, false if not.

***

### loadModel()

```ts
loadModel(): Promise<void>
```

Defined in: [model.ts:126](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L126)

Load the model weights.

#### Returns

`Promise`\<`void`\>

