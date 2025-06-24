[Home](/docs/globals.md) / MoonshineModel

# Class: MoonshineModel

Defined in: [model.ts:15](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L15)

Implements speech-to-text inferences with Moonshine models.

## Constructors

### new MoonshineModel()

```ts
new MoonshineModel(modelURL, precision): MoonshineModel
```

Defined in: [model.ts:35](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L35)

Create (but do not load) a new MoonshineModel for inference.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` | A string (relative to [Settings.BASE\_ASSET\_PATH](/docs/variables/Settings.md#base_asset_path)) where the `.onnx` model weights are located. |
| `precision` | `string` | `"quantized"` | - |

#### Returns

[`MoonshineModel`](/docs/classes/MoonshineModel.md)

#### Remarks

Creating a MoonshineModel has the side effect of setting the path to the `onnxruntime-web` `.wasm` to the [Settings.BASE\_ASSET\_PATH](/docs/variables/Settings.md#base_asset_path)

## Methods

### benchmark()

```ts
benchmark(sampleSize): Promise<number>
```

Defined in: [model.ts:102](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L102)

Tests the inference latency of the current environment.

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

Defined in: [model.ts:194](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L194)

Generate a transcription of the passed audio.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `audio` | `Float32Array` | A `Float32Array` containing raw audio samples from an audio source (e.g., a wav file, or a user's microphone) |

#### Returns

`Promise`\<`string`\>

A `Promise<string>` that resolves with the generated transcription.

***

### getLatency()

```ts
getLatency(): number
```

Defined in: [model.ts:123](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L123)

Returns the latency (in ms) of the most recent call to [MoonshineModel.generate](/docs/classes/MoonshineModel.md#generate)

#### Returns

`number`

A latency reading (in ms)

***

### isLoaded()

```ts
isLoaded(): boolean
```

Defined in: [model.ts:182](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L182)

Returns whether or not the model weights have been loaded.

#### Returns

`boolean`

`true` if the model is loaded, `false` if not.

***

### isLoading()

```ts
isLoading(): boolean
```

Defined in: [model.ts:173](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L173)

Returns whether or not the model is in the process of loading.

#### Returns

`boolean`

`true` if the model is currently loading, `false` if not.

***

### loadModel()

```ts
loadModel(): Promise<void>
```

Defined in: [model.ts:133](https://github.com/usefulsensors/moonshine-js/blob/main/src/model.ts#L133)

Load the model weights.

#### Returns

`Promise`\<`void`\>

#### Remarks

This can be a somewhat long-running (in the tens of seconds) async operation, depending on the user's connection and your choice of model (tiny vs base). 
To avoid weird async problems that can occur with multiple calls to loadModel, we store and return a single Promise that resolves when the model is loaded.
