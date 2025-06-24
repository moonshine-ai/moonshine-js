[Home](/docs/globals.md) / MicrophoneTranscriber

# Class: MicrophoneTranscriber

Defined in: [microphoneTranscriber.ts:7](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L7)

Accesses the user's microphone and transcribes their speech.

## Extends

- [`Transcriber`](/docs/classes/Transcriber.md)

## Constructors

### new MicrophoneTranscriber()

```ts
new MicrophoneTranscriber(
   modelURL, 
   callbacks, 
   useVAD): MicrophoneTranscriber
```

Defined in: [microphoneTranscriber.ts:53](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L53)

Creates a transcriber for transcribing an audio stream from a mic.

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `modelURL` | `string` | `undefined` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md)\> | `{}` |
| `useVAD` | `boolean` | `true` |

#### Returns

[`MicrophoneTranscriber`](/docs/classes/MicrophoneTranscriber.md)

#### Example

This basic example demonstrates the use of the transcriber with custom callbacks:

``` ts
import MicrophoneTranscriber from "@moonshine-ai/moonshine-js";

var transcriber = new MicrophoneTranscriber(
     "model/tiny"
     {
         onPermissionsRequested() {
             console.log("Requesting permissions.") 
         },
         onError(error) {
             console.log(`Error: ${error}`)
         },
         onModelLoadStarted() {
             console.log("onModelLoadStarted()");
         },
         onTranscribeStarted() {
             console.log("onTranscribeStarted()");
         },
         onTranscribeStopped() {
             console.log("onTranscribeStopped()");
         },
         onTranscriptionUpdated(text: string) {
             console.log(
                 "onTranscriptionUpdated(" + text + ")"
             );
         },
         onTranscriptionCommitted(text: string) {
             console.log(
                 "onTranscriptionCommitted(" + text + ")"
             );
         },
     },
     false // use streaming mode
);

transcriber.start();
```

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

Defined in: [microphoneTranscriber.ts:66](https://github.com/usefulsensors/moonshine-js/blob/main/src/microphoneTranscriber.ts#L66)

Starts transcription. This will request permission to access the user's microphone, if it hasn't already been granted.

Transcription will stop when [stop](/docs/classes/MicrophoneTranscriber.md#stop) is called.

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
