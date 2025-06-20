undefined
# Class: `abstract` VoiceController

Defined in: [voiceController.ts:12](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L12)

An interface for invoking voice-controlled actions on a page using speech transcribed by a [Transcriber](/docs/api/classes/transcriber).

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

Defined in: [voiceController.ts:26](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L26)

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
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [voiceController.ts:13](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L13) |
| <a id="onerror"></a> `onError` | (`error`: `any`) => `any` | [voiceController.ts:16](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [voiceController.ts:18](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L18) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [voiceController.ts:17](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="onpermissionsrequested"></a> `onPermissionsRequested` | () => `any` | [voiceController.ts:15](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [voiceController.ts:24](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L24) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [voiceController.ts:23](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L23) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [voiceController.ts:19](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L19) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [voiceController.ts:20](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L20) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [voiceController.ts:21](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L21) |
| <a id="ontranscriptionupdated"></a> `onTranscriptionUpdated` | (`text`: `string`) => `any` | [voiceController.ts:22](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L22) |

## Methods

### normalizeText()

```ts
static normalizeText(text): string
```

Defined in: [voiceController.ts:78](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L78)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`string`

