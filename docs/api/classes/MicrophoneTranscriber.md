undefined
# Class: MicrophoneTranscriber

Defined in: [microphoneTranscriber.ts:8](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L8)

Accesses the user's microphone and generates transcriptions using an underlying [StreamTranscriber](/docs/api/classes/streamtranscriber).

## Extends

- [`StreamTranscriber`](/docs/api/classes/streamtranscriber)

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
| `useVAD` | `boolean` | `false` |

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

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`constructor`](/docs/api/classes/streamtranscriber#constructors)

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`callbacks`](/docs/api/classes/streamtranscriber#callbacks-1) | [transcriber.ts:81](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L81) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`isActive`](/docs/api/classes/streamtranscriber#isactive) | [streamTranscriber.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L18) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`model`](/docs/api/classes/streamtranscriber#model) | [transcriber.ts:80](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L80) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [streamTranscriber.ts:116](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L116)

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

Defined in: [streamTranscriber.ts:129](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L129)

Detaches the MediaStream used for transcription.

#### Returns

`void`

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`detachStream`](/docs/api/classes/streamtranscriber#detachstream)

***

### getAudioBuffer()

```ts
getAudioBuffer(): AudioBuffer
```

Defined in: [streamTranscriber.ts:143](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L143)

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

Defined in: [transcriber.ts:93](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L93)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`loadModel`](/docs/api/classes/streamtranscriber#loadmodel)

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

Transcription will stop when [stop](/docs/api/classes/microphonetranscriber#stop) is called, or when [Settings.MAX\_RECORD\_MS](/docs/api/variables/settings#max_record_ms) is passed (whichever comes first).

#### Returns

`Promise`\<`void`\>

#### Overrides

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`start`](/docs/api/classes/streamtranscriber#start)

***

### stop()

```ts
stop(): void
```

Defined in: [streamTranscriber.ts:257](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L257)

Stops transcription.

#### Returns

`void`

#### Inherited from

[`StreamTranscriber`](/docs/api/classes/streamtranscriber).[`stop`](/docs/api/classes/streamtranscriber#stop)

