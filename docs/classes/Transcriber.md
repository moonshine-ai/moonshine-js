[Home](/docs/globals.md) / Transcriber

# Class: Transcriber

Defined in: [transcriber.ts:198](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L198)

Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object.

Read more about working with MediaStreams: [https://developer.mozilla.org/en-US/docs/Web/API/MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)

## Extended by

- [`MicrophoneTranscriber`](/docs/classes/MicrophoneTranscriber.md)
- [`MediaElementTranscriber`](/docs/classes/MediaElementTranscriber.md)

## Constructors

### new Transcriber()

```ts
new Transcriber(
   modelURL, 
   callbacks, 
   useVAD): Transcriber
```

Defined in: [transcriber.ts:265](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L265)

Creates a transcriber for transcribing a MediaStream from any source. After creating the [Transcriber](/docs/classes/Transcriber.md), you must invoke
[Transcriber.attachStream](/docs/classes/Transcriber.md#attachstream) to provide a MediaStream that you want to transcribe.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` | The URL that the underlying [MoonshineModel](/docs/classes/MoonshineModel.md) weights should be loaded from, relative to [Settings.BASE\_ASSET\_PATH.MOONSHINE](/docs/variables/Settings.md#). |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md)\> | `{}` | A set of [TranscriberCallbacks](/docs/interfaces/TranscriberCallbacks.md) used to trigger behavior at different steps of the transcription lifecycle. For transcription-only use cases, you should define the [TranscriberCallbacks](/docs/interfaces/TranscriberCallbacks.md) yourself; when using the transcriber for voice control, you should create a [VoiceController](/docs/classes/VoiceController.md) and pass it in. |
| `useVAD` | `boolean` | `true` | A boolean specifying whether or not to use Voice Activity Detection (VAD) for deciding when to perform transcriptions. When set to `true`, the transcriber will only process speech at the end of each chunk of voice activity; when set to `false`, the transcriber will operate in streaming mode, generating continuous transcriptions on a rapid interval. |

#### Returns

[`Transcriber`](/docs/classes/Transcriber.md)

#### Example

This basic example demonstrates the use of the transcriber with custom callbacks:

``` ts
import Transcriber from "@moonshine-ai/moonshine-js";

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
     },
     false // use streaming mode
);

// Get a MediaStream from somewhere (user mic, active tab, an <audio> element, WebRTC source, etc.)
...

transcriber.attachStream(stream);
transcriber.start();
```

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="audiocontext"></a> `audioContext` | `protected` | `AudioContext` | `undefined` | [transcriber.ts:208](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L208) |
| <a id="callbacks-1"></a> `callbacks` | `public` | [`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md) | `undefined` | [transcriber.ts:202](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L202) |
| <a id="isactive"></a> `isActive` | `public` | `boolean` | `false` | [transcriber.ts:209](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L209) |

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

***

### load()

```ts
load(): Promise<void>
```

Defined in: [transcriber.ts:283](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L283)

Preloads the models and initializes the buffer required for transcription.

#### Returns

`Promise`\<`void`\>

***

### start()

```ts
start(): Promise<void>
```

Defined in: [transcriber.ts:440](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L440)

Starts transcription.

Transcription will stop when [stop](/docs/classes/Transcriber.md#stop) is called.

Note that the [Transcriber](/docs/classes/Transcriber.md) must have a MediaStream attached via [Transcriber.attachStream](/docs/classes/Transcriber.md#attachstream) before
starting transcription.

#### Returns

`Promise`\<`void`\>

***

### stop()

```ts
stop(): void
```

Defined in: [transcriber.ts:468](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L468)

Stops transcription.

#### Returns

`void`
