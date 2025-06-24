[Home](/docs/globals.md) / VideoCaptioner

# Class: VideoCaptioner

Defined in: [mediaElementTranscriber.ts:55](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L55)

Transcribes a <video> element, rendering the results as captions on the video.

## Extends

- [`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md)

## Constructors

### new VideoCaptioner()

```ts
new VideoCaptioner(
   videoElement, 
   modelURL, 
   useVAD): VideoCaptioner
```

Defined in: [mediaElementTranscriber.ts:60](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L60)

Creates a transcriber that overlays transcription output as captions on a `<video>` element.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `videoElement` | `HTMLVideoElement` | `undefined` |
| `modelURL` | `string` | `undefined` |
| `useVAD` | `boolean` | `false` |

#### Returns

[`VideoCaptioner`](/docs/classes/VideoCaptioner.md)

#### Overrides

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`constructor`](/docs/classes/MediaElementTranscriber.md#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`audioContext`](/docs/classes/MediaElementTranscriber.md#audiocontext) | [transcriber.ts:208](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L208) |
| <a id="callbacks"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md) | `undefined` | [`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`callbacks`](/docs/classes/MediaElementTranscriber.md#callbacks-1) | [transcriber.ts:202](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L202) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`isActive`](/docs/classes/MediaElementTranscriber.md#isactive) | [transcriber.ts:209](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L209) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [transcriber.ts:387](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L387)

Attaches a MediaStream to this [Transcriber](/docs/classes/Transcriber.md) for transcription. A MediaStream must be attached before
starting transcription.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stream` | `MediaStream` | A MediaStream to transcribe |

#### Returns

`void`

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`attachStream`](/docs/classes/MediaElementTranscriber.md#attachstream)

***

### detachStream()

```ts
detachStream(): void
```

Defined in: [transcriber.ts:411](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L411)

Detaches the MediaStream used for transcription.

#### Returns

`void`

#### Todo

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`detachStream`](/docs/classes/MediaElementTranscriber.md#detachstream)

***

### getAudioBuffer()

```ts
getAudioBuffer(buffer): AudioBuffer
```

Defined in: [transcriber.ts:421](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L421)

Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
we want to double-check the audio being input to the model while debugging.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `buffer` | `Float32Array` |

#### Returns

`AudioBuffer`

An AudioBuffer

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`getAudioBuffer`](/docs/classes/MediaElementTranscriber.md#getaudiobuffer)

***

### load()

```ts
load(): Promise<void>
```

Defined in: [transcriber.ts:283](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L283)

Preloads the models and initializes the buffer required for transcription.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`load`](/docs/classes/MediaElementTranscriber.md#load)

***

### start()

```ts
start(): Promise<void>
```

Defined in: [mediaElementTranscriber.ts:29](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L29)

Starts transcription.

Transcription will stop when [stop](/docs/classes/VideoCaptioner.md#stop) is called.

Note that the [Transcriber](/docs/classes/Transcriber.md) must have a MediaStream attached via [Transcriber.attachStream](/docs/classes/Transcriber.md#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`start`](/docs/classes/MediaElementTranscriber.md#start)

***

### stop()

```ts
stop(): void
```

Defined in: [transcriber.ts:468](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L468)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md).[`stop`](/docs/classes/MediaElementTranscriber.md#stop)
