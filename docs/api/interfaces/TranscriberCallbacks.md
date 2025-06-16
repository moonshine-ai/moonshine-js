undefined
# Interface: TranscriberCallbacks

Defined in: [transcriber.ts:36](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L36)

Callbacks are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application
in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="onerror"></a> `onError` | (`error`: `any`) => `any` | [transcriber.ts:39](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L39) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [transcriber.ts:43](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L43) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [transcriber.ts:41](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L41) |
| <a id="onpermissionsrequested"></a> `onPermissionsRequested` | () => `any` | [transcriber.ts:37](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L37) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [transcriber.ts:55](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L55) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [transcriber.ts:53](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L53) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [transcriber.ts:45](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L45) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [transcriber.ts:47](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L47) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [transcriber.ts:51](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L51) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [transcriber.ts:49](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L49) |

