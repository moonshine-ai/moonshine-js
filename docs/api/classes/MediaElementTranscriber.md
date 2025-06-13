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
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`callbacks`](/docs/api/classes/transcriber#callbacks-1) | [transcriber.ts:100](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L100) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`Transcriber`](/docs/api/classes/transcriber).[`isActive`](/docs/api/classes/transcriber#isactive) | [transcriber.ts:108](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L108) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`model`](/docs/api/classes/transcriber#model) | [transcriber.ts:99](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L99) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [transcriber.ts:259](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L259)

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

Defined in: [transcriber.ts:278](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L278)

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

Defined in: [transcriber.ts:288](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L288)

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

Defined in: [transcriber.ts:172](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L172)

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
else if `useVAD === false`: generate an updated transcription every [Settings.FRAME\_SIZE](/docs/api/variables/settings#frame_size) milliseconds.

Transcription will stop when [stop](/docs/api/classes/mediaelementtranscriber#stop) is called, or when [Settings.MAX\_RECORD\_MS](/docs/api/variables/settings#max_record_ms) is passed (whichever comes first).

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

Defined in: [transcriber.ts:329](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L329)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`stop`](/docs/api/classes/transcriber#stop)

