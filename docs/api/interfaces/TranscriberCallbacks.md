undefined
# Interface: TranscriberCallbacks

Defined in: [transcriber.ts:35](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L35)

Callbacks are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application
in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="onerror"></a> `onError` | (`error`: `any`) => `any` | [transcriber.ts:38](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L38) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [transcriber.ts:42](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L42) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [transcriber.ts:40](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L40) |
| <a id="onpermissionsrequested"></a> `onPermissionsRequested` | () => `any` | [transcriber.ts:36](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L36) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [transcriber.ts:54](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L54) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [transcriber.ts:52](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L52) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [transcriber.ts:44](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L44) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [transcriber.ts:46](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L46) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [transcriber.ts:50](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L50) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [transcriber.ts:48](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L48) |

