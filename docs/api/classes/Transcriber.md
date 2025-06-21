undefined
# Class: Transcriber

Defined in: [transcriber.ts:97](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L97)

Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.

Read more about working with MediaStreams: [https://developer.mozilla.org/en-US/docs/Web/API/MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)

## Extended by

- [`MicrophoneTranscriber`](/docs/api/classes/microphonetranscriber)
- [`MediaElementTranscriber`](/docs/api/classes/mediaelementtranscriber)

## Constructors

### new Transcriber()

```ts
new Transcriber(
   modelURL, 
   callbacks, 
   useVAD): Transcriber
```

Defined in: [transcriber.ts:163](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L163)

Creates a transcriber for transcribing a MediaStream from any source. After creating the [Transcriber](/docs/api/classes/transcriber), you must invoke
[Transcriber.attachStream](/docs/api/classes/transcriber#attachstream) to provide a MediaStream that you want to transcribe.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` | The URL that the underlying [MoonshineModel](/docs/api/classes/moonshinemodel) weights should be loaded from, relative to [Settings.BASE\_ASSET\_PATH.MOONSHINE](/docs/api/variables/settings#). |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` | A set of [TranscriberCallbacks](/docs/api/interfaces/transcribercallbacks) used to trigger behavior at different steps of the transcription lifecycle. For transcription-only use cases, you should define the [TranscriberCallbacks](/docs/api/interfaces/transcribercallbacks) yourself; when using the transcriber for voice control, you should create a [VoiceController](/docs/api/classes/voicecontroller) and pass it in. |
| `useVAD` | `boolean` | `true` | A boolean specifying whether or not to use Voice Activity Detection (VAD) on audio processed by the transcriber. When set to `true`, the transcriber will only process speech at the end of each chunk of voice activity. |

#### Returns

[`Transcriber`](/docs/api/classes/transcriber)

#### Example

This basic example demonstrates the use of the transcriber with custom callbacks:

``` ts
import Transcriber from "@usefulsensors/moonshine-js";

var transcriber = new Transcriber(
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

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [transcriber.ts:106](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L106) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks) | `undefined` | [transcriber.ts:100](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L100) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [transcriber.ts:107](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L107) |
| <a id="model"></a> `model` | `static` | [`MoonshineModel`](/docs/api/classes/moonshinemodel) | `undefined` | [transcriber.ts:99](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L99) |

## Methods

### attachStream()

```ts
attachStream(stream): void
```

Defined in: [transcriber.ts:288](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L288)

Attaches a MediaStream to this [Transcriber](/docs/api/classes/transcriber) for transcription. A MediaStream must be attached before
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

Defined in: [transcriber.ts:312](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L312)

Detaches the MediaStream used for transcription.

#### Returns

`void`

#### Todo

***

### getAudioBuffer()

```ts
getAudioBuffer(): AudioBuffer
```

Defined in: [transcriber.ts:322](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L322)

Returns the most recent AudioBuffer that was input to the underlying model for text generation. This is useful in cases where
we want to double-check the audio being input to the model while debugging.

#### Returns

`AudioBuffer`

An AudioBuffer

***

### load()

```ts
load(): Promise<void>
```

Defined in: [transcriber.ts:175](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L175)

#### Returns

`Promise`\<`void`\>

***

### start()

```ts
start(): Promise<void>
```

Defined in: [transcriber.ts:344](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L344)

Starts transcription.

if `useVAD === true`: generate an updated transcription at the end of every chunk of detected voice activity.
else if `useVAD === false`: generate an updated transcription every [Settings.STREAM\_UPDATE\_INTERVAL](/docs/api/variables/settings#stream_update_interval).

Transcription will stop when [stop](/docs/api/classes/transcriber#stop) is called.

Note that the [Transcriber](/docs/api/classes/transcriber) must have a MediaStream attached via [Transcriber.attachStream](/docs/api/classes/transcriber#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

***

### stop()

```ts
stop(): void
```

Defined in: [transcriber.ts:382](https://github.com/moonshine-ai/moonshine-js/blob/main/src/transcriber.ts#L382)

Stops transcription.

#### Returns

`void`

