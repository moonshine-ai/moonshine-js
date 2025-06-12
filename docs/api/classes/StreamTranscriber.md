undefined
# Class: StreamTranscriber

Defined in: [streamTranscriber.ts:12](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L12)

Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.

Read more about working with MediaStreams: [https://developer.mozilla.org/en-US/docs/Web/API/MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)

## Extends

- `Transcriber`

## Extended by

- [`MicrophoneTranscriber`](/docs/api/classes/microphonetranscriber)
- [`MediaElementTranscriber`](/docs/api/classes/mediaelementtranscriber)

## Constructors

### new StreamTranscriber()

```ts
new StreamTranscriber(
   modelURL, 
   callbacks, 
   useVAD): StreamTranscriber
```

Defined in: [streamTranscriber.ts:71](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L71)

Creates a transcriber for transcribing a MediaStream from any source. After creating the [StreamTranscriber](/docs/api/classes/streamtranscriber), you must invoke
[StreamTranscriber.attachStream](/docs/api/classes/streamtranscriber#attachstream) to provide a MediaStream that you want to transcribe.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` | The URL that the underlying [MoonshineModel](/docs/api/classes/moonshinemodel) weights should be loaded from, relative to [Settings.BASE\_ASSET\_PATH](/docs/api/variables/settings#base_asset_path). |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` | A set of [TranscriberCallbacks](/docs/api/interfaces/transcribercallbacks) used to trigger behavior at different steps of the transcription lifecycle. For transcription-only use cases, you should define the [TranscriberCallbacks](/docs/api/interfaces/transcribercallbacks) yourself; when using the transcriber for voice control, you should create a [VoiceController](/docs/api/classes/voicecontroller) and pass it in. |
| `useVAD` | `boolean` | `true` | A boolean specifying whether or not to use Voice Activity Detection (VAD) on audio processed by the transcriber. When set to `true`, the transcriber will only process speech at the end of each chunk of voice activity. |

#### Returns

[`StreamTranscriber`](/docs/api/classes/streamtranscriber)

#### Example

This basic example demonstrates the use of the transcriber with custom callbacks:

``` ts
import StreamTranscriber from "@usefulsensors/moonshine-js";

var transcriber = new StreamTranscriber(
     "model/tiny",
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
     }
);

// Get a MediaStream from somewhere (user mic, active tab, an <audio> element, WebRTC source, etc.)
...

transcriber.attachStream(stream);
transcriber.start();
```

#### Overrides

```ts
Transcriber.constructor
```

## Properties

| Property | Modifier | Type | Default value | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | - | [streamTranscriber.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L13) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | `Transcriber.callbacks` | [transcriber.ts:95](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L95) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | - | [streamTranscriber.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L17) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | `Transcriber.model` | [transcriber.ts:94](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L94) |

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

***

### loadModel()

```ts
loadModel(): Promise<void>
```

Defined in: [transcriber.ts:107](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L107)

#### Returns

`Promise`\<`void`\>

#### Inherited from

```ts
Transcriber.loadModel
```

***

### start()

```ts
start(): Promise<void>
```

Defined in: [streamTranscriber.ts:210](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L210)

Starts transcription.

if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
else if `useVAD === false`: generate an updated transcription every [Settings.FRAME\_SIZE](/docs/api/variables/settings#frame_size) milliseconds.

Transcription will stop when [stop](/docs/api/classes/streamtranscriber#stop) is called, or when [Settings.MAX\_RECORD\_MS](/docs/api/variables/settings#max_record_ms) is passed (whichever comes first).

Note that the [StreamTranscriber](/docs/api/classes/streamtranscriber) must have a MediaStream attached via [StreamTranscriber.attachStream](/docs/api/classes/streamtranscriber#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

#### Overrides

```ts
Transcriber.start
```

***

### stop()

```ts
stop(): void
```

Defined in: [streamTranscriber.ts:228](https://github.com/usefulsensors/moonshine-js/blob/main/src/streamTranscriber.ts#L228)

Stops transcription.

#### Returns

`void`

#### Overrides

```ts
Transcriber.stop
```

