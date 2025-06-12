undefined
# Class: MediaElementTranscriber

Defined in: [mediaElementTranscriber.ts:7](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L7)

Transcribes the output of an `<audio>` or `<video>` HTML element.

## Extends

- [`StreamTranscriber`](/docs/api/classes/streamtranscriber)

## Constructors

### new MediaElementTranscriber()

```ts
new MediaElementTranscriber(
   mediaElement, 
   modelURL, 
   callbacks, 
   useVAD): MediaElementTranscriber
```

Defined in: [mediaElementTranscriber.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L18)

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

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`constructor`](/docs/api/classes/streamtranscriber#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`audioContext`](/docs/api/classes/streamtranscriber#audiocontext) | [streamTranscriber.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L13) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`callbacks`](/docs/api/classes/streamtranscriber#callbacks-1) | [transcriber.ts:95](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L95) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`isActive`](/docs/api/classes/streamtranscriber#isactive) | [streamTranscriber.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L17) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`model`](/docs/api/classes/streamtranscriber#model) | [transcriber.ts:94](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L94) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [streamTranscriber.ts:161](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L161)

Attaches a MediaStream to this [StreamTranscriber](/docs/api/classes/streamtranscriber) for transcription. A MediaStream must be attached before
starting transcription.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `stream` | `MediaStream` | A MediaStream to transcribe |

#### Returns

`void`

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`attachStream`](/docs/api/classes/streamtranscriber#attachstream)

***

### detachStream()

```ts
detachStream(): void
```

Defined in: [streamTranscriber.ts:178](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L178)

Detaches the MediaStream used for transcription.

#### Returns

`void`

#### Todo

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`detachStream`](/docs/api/classes/streamtranscriber#detachstream)

***

### getAudioBuffer()

```ts
getAudioBuffer(): AudioBuffer
```

Defined in: [streamTranscriber.ts:188](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L188)

Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
we want to double-check the audio being input to the model while debugging.

#### Returns

`AudioBuffer`

An AudioBuffer

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`getAudioBuffer`](/docs/api/classes/streamtranscriber#getaudiobuffer)

***

### loadModel()

```ts
loadModel(): Promise<void>
```

Defined in: [transcriber.ts:107](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L107)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`loadModel`](/docs/api/classes/streamtranscriber#loadmodel)

***

### start()

```ts
start(): Promise<void>
```

Defined in: [mediaElementTranscriber.ts:34](https://github.com/usefulsensors/moonshine-js/blob/main/src/mediaElementTranscriber.ts#L34)

Starts transcription.

if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
else if `useVAD === false`: generate an updated transcription every [Settings.FRAME\_SIZE](/docs/api/variables/settings#frame_size) milliseconds.

Transcription will stop when [stop](/docs/api/classes/mediaelementtranscriber#stop) is called, or when [Settings.MAX\_RECORD\_MS](/docs/api/variables/settings#max_record_ms) is passed (whichever comes first).

Note that the [StreamTranscriber](/docs/api/classes/streamtranscriber) must have a MediaStream attached via [StreamTranscriber.attachStream](/docs/api/classes/streamtranscriber#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

#### Overrides

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`start`](/docs/api/classes/streamtranscriber#start)

***

### stop()

```ts
stop(): void
```

Defined in: [streamTranscriber.ts:228](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L228)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`stop`](/docs/api/classes/streamtranscriber#stop)

