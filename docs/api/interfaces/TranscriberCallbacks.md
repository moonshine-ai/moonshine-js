undefined
# Interface: TranscriberCallbacks

Defined in: [transcriber.ts:31](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L31)

Callbacks are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application
in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [transcriber.ts:34](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L34) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [transcriber.ts:32](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L32) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [transcriber.ts:46](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L46) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [transcriber.ts:44](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L44) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [transcriber.ts:36](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L36) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [transcriber.ts:38](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L38) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [transcriber.ts:42](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L42) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [transcriber.ts:40](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L40) |

