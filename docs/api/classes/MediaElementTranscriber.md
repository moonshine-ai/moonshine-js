undefined
# Class: MediaElementTranscriber

Defined in: [mediaElementTranscriber.ts:6](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L6)

Transcribes the output of an `<audio>` or `<video>` HTML element.

## Extends

- [`Transcriber`](/docs/api/classes/transcriber)

## Constructors

### new MediaElementTranscriber()

```ts
new MediaElementTranscriber(
   mediaElement, 
   modelURL, 
   callbacks, 
   useVAD): MediaElementTranscriber
```

Defined in: [mediaElementTranscriber.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L17)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `mediaElement` | `HTMLMediaElement` | `undefined` |  |
| `modelURL` | `string` | `undefined` |  |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` |  |
| `useVAD` | `boolean` | `true` |  |

#### Returns

[`MediaElementTranscriber`](/docs/api/classes/mediaelementtranscriber)

#### Overrides

[`Transcriber`](/docs/api/classes/transcriber).[`constructor`](/docs/api/classes/transcriber#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`audioContext`](/docs/api/classes/transcriber#audiocontext) | [transcriber.ts:107](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L107) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`callbacks`](/docs/api/classes/transcriber#callbacks-1) | [transcriber.ts:99](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L99) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`Transcriber`](/docs/api/classes/transcriber).[`isActive`](/docs/api/classes/transcriber#isactive) | [transcriber.ts:108](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L108) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`model`](/docs/api/classes/transcriber#model) | [transcriber.ts:98](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L98) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [transcriber.ts:281](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L281)

Attaches a MediaStream to this [Transcriber](/docs/api/classes/transcriber) for transcription. A MediaStream must be attached before
starting transcription.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stream` | `MediaStream` | A MediaStream to transcribe |

#### Returns

`void`

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`attachStream`](/docs/api/classes/transcriber#attachstream)

***

### detachStream()

```ts
detachStream(): void
```

Defined in: [transcriber.ts:300](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L300)

Detaches the MediaStream used for transcription.

#### Returns

`void`

#### Todo

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`detachStream`](/docs/api/classes/transcriber#detachstream)

***

### getAudioBuffer()

```ts
getAudioBuffer(): AudioBuffer
```

Defined in: [transcriber.ts:310](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L310)

Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
we want to double-check the audio being input to the model while debugging.

#### Returns

`AudioBuffer`

An AudioBuffer

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`getAudioBuffer`](/docs/api/classes/transcriber#getaudiobuffer)

***

### load()

```ts
load(): Promise<void>
```

Defined in: [transcriber.ts:173](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L173)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`load`](/docs/api/classes/transcriber#load)

***

### start()

```ts
start(): Promise<void>
```

Defined in: [mediaElementTranscriber.ts:33](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L33)

Starts transcription.

if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
else if `useVAD === false`: generate an updated transcription every [Settings.STREAM\_UPDATE\_INTERVAL](/docs/api/variables/settings#stream_update_interval).

Transcription will stop when [stop](/docs/api/classes/mediaelementtranscriber#stop) is called.

Note that the [Transcriber](/docs/api/classes/transcriber) must have a MediaStream attached via [Transcriber.attachStream](/docs/api/classes/transcriber#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Transcriber`](/docs/api/classes/transcriber).[`start`](/docs/api/classes/transcriber#start)

***

### stop()

```ts
stop(): void
```

Defined in: [transcriber.ts:349](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L349)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`stop`](/docs/api/classes/transcriber#stop)

