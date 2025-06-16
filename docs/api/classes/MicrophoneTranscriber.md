undefined
# Class: MicrophoneTranscriber

Defined in: [microphoneTranscriber.ts:8](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L8)

Accesses the user's microphone and transcribes their speech.

## Extends

- [`Transcriber`](/docs/api/classes/transcriber)

## Constructors

### new MicrophoneTranscriber()

```ts
new MicrophoneTranscriber(
   modelURL, 
   callbacks, 
   useVAD): MicrophoneTranscriber
```

Defined in: [microphoneTranscriber.ts:47](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L47)

Creates a transcriber for transcribing an audio stream from a mic.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` |
| `useVAD` | `boolean` | `true` |

#### Returns

[`MicrophoneTranscriber`](/docs/api/classes/microphonetranscriber)

#### Example

This basic example demonstrates the use of the transcriber with custom callbacks:

``` ts
import MicrophoneTranscriber from "@usefulsensors/moonshine-js";

var transcriber = new MicrophoneTranscriber(
     "model/tiny"
     {
         onModelLoadStarted() {
             console.log("onModelLoadStarted()");
         },
         onTranscribeStarted() {
             console.log("onTranscribeStarted()");
         },
         onTranscribeStopped() {
             console.log("onTranscribeStopped()");
         },
         onTranscriptionUpdated(text: string | undefined) {
             console.log(
                 "onTranscriptionUpdated(" + text + ")"
             );
         },
         onTranscriptionCommitted(text: string | undefined) {
             console.log(
                 "onTranscriptionCommitted(" + text + ")"
             );
         },
     },
);

transcriber.start();
```

#### Overrides

[`Transcriber`](/docs/api/classes/transcriber).[`constructor`](/docs/api/classes/transcriber#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`audioContext`](/docs/api/classes/transcriber#audiocontext) | [transcriber.ts:105](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L105) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`callbacks`](/docs/api/classes/transcriber#callbacks-1) | [transcriber.ts:99](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L99) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`Transcriber`](/docs/api/classes/transcriber).[`isActive`](/docs/api/classes/transcriber#isactive) | [transcriber.ts:106](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L106) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [`Transcriber`](/docs/api/classes/transcriber).[`model`](/docs/api/classes/transcriber#model) | [transcriber.ts:98](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L98) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [transcriber.ts:279](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L279)

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

Defined in: [transcriber.ts:303](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L303)

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

Defined in: [transcriber.ts:313](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L313)

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

Defined in: [transcriber.ts:171](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L171)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`load`](/docs/api/classes/transcriber#load)

***

### start()

```ts
start(): Promise<void>
```

Defined in: [microphoneTranscriber.ts:66](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L66)

Starts transcription.

This will request microphone permissions (if not already provided), load the model (if not already loaded), and do
one of the following:

if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
else if `useVAD === false`: generate an updated transcription every [Settings.FRAME\_SIZE](/docs/api/variables/settings#frame_size) milliseconds. 

Transcription will stop when [stop](/docs/api/classes/microphonetranscriber#stop) is called, or when Settings.MAX\_RECORD\_MS is passed (whichever comes first).

#### Returns

`Promise`\<`void`\>

#### Overrides

[`Transcriber`](/docs/api/classes/transcriber).[`start`](/docs/api/classes/transcriber#start)

***

### stop()

```ts
stop(): void
```

Defined in: [transcriber.ts:352](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L352)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`Transcriber`](/docs/api/classes/transcriber).[`stop`](/docs/api/classes/transcriber#stop)

