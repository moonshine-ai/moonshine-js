undefined
# Interface: TranscriberCallbacks

Defined in: [transcriber.ts:26](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L26)

Callbacks that are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application 
in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [transcriber.ts:29](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L29) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [transcriber.ts:27](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L27) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [transcriber.ts:31](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L31) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [transcriber.ts:33](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L33) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [transcriber.ts:37](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L37) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [transcriber.ts:35](https://github.com/usefulsensors/moonshine-js/blob/main/src/transcriber.ts#L35) |

