[Home](/docs/globals.md) / MediaElementTranscriber

# Class: MediaElementTranscriber

Defined in: [mediaElementTranscriber.ts:6](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L6)

Transcribes the output of an `<audio>` or `<video>` HTML element.

## Extends

- [`Transcriber`](/docs/classes/Transcriber.md)

## Extended by

- [`VideoCaptioner`](/docs/classes/VideoCaptioner.md)

## Constructors

### new MediaElementTranscriber()

```ts
new MediaElementTranscriber(
   mediaElement, 
   modelURL, 
   callbacks, 
   useVAD): MediaElementTranscriber
```

Defined in: [mediaElementTranscriber.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L13)

Creates a transcriber that generates transcriptions from the output of HTML `<audio>` or `<video>` elements.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `mediaElement` | `HTMLMediaElement` | `undefined` |
| `modelURL` | `string` | `undefined` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md)\> | `{}` |
| `useVAD` | `boolean` | `true` |

#### Returns

[`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md)

#### Overrides

[`Transcriber`](/docs/classes/Transcriber.md).[`constructor`](/docs/classes/Transcriber.md#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [`Transcriber`](/docs/classes/Transcriber.md).[`audioContext`](/docs/classes/Transcriber.md#audiocontext) | [transcriber.ts:208](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L208) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md) | `undefined` | [`Transcriber`](/docs/classes/Transcriber.md).[`callbacks`](/docs/classes/Transcriber.md#callbacks-1) | [transcriber.ts:202](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L202) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`Transcriber`](/docs/classes/Transcriber.md).[`isActive`](/docs/classes/Transcriber.md#isactive) | [transcriber.ts:209](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L209) |

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

[`Transcriber`](/docs/classes/Transcriber.md).[`attachStream`](/docs/classes/Transcriber.md#attachstream)

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

[`Transcriber`](/docs/classes/Transcriber.md).[`detachStream`](/docs/classes/Transcriber.md#detachstream)

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

[`Transcriber`](/docs/classes/Transcriber.md).[`getAudioBuffer`](/docs/classes/Transcriber.md#getaudiobuffer)

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

[`Transcriber`](/docs/classes/Transcriber.md).[`load`](/docs/classes/Transcriber.md#load)

***

### start()

```ts
start(): Promise<void>
```

Defined in: [mediaElementTranscriber.ts:29](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L29)

Starts transcription.

Transcription will stop when [stop](/docs/classes/MediaElementTranscriber.md#stop) is called.

Note that the [Transcriber](/docs/classes/Transcriber.md) must have a MediaStream attached via [Transcriber.attachStream](/docs/classes/Transcriber.md#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Transcriber`](/docs/classes/Transcriber.md).[`start`](/docs/classes/Transcriber.md#start)

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

[`Transcriber`](/docs/classes/Transcriber.md).[`stop`](/docs/classes/Transcriber.md#stop)
