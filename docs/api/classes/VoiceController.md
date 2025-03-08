undefined
# Class: `abstract` VoiceController

Defined in: [voiceController.ts:11](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L11)

An interface for invoking voice-controlled actions on a page using speech transcribed by a Transcriber.

## Extended by

- [`KeywordSpotter`](/docs/api/classes/keywordspotter)
- [`IntentClassifier`](/docs/api/classes/intentclassifier)

## Implements

- [`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)

## Constructors

### new VoiceController()

```ts
new VoiceController(commandHandlers, callbacks): VoiceController
```

Defined in: [voiceController.ts:21](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commandHandlers` | `CommandHandlers` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> |

#### Returns

[`VoiceController`](/docs/api/classes/voicecontroller)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [voiceController.ts:12](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L12) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [voiceController.ts:15](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [voiceController.ts:14](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L14) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [voiceController.ts:16](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [voiceController.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [voiceController.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L18) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [voiceController.ts:19](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L19) |

