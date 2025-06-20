undefined
# Class: KeywordSpotter

Defined in: [voiceController.ts:89](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L89)

Implements voice control using basic keyword spotting.

Keyword spotting is most useful in cases where we need to match EXACT user command phrases to actions
with no ambiguity, e.g., matching the exact words "scroll up" to a scroll up action.

## Extends

- [`VoiceController`](/docs/api/classes/voicecontroller)

## Constructors

### new KeywordSpotter()

```ts
new KeywordSpotter(commandHandlers, callbacks): KeywordSpotter
```

Defined in: [voiceController.ts:26](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commandHandlers` | `CommandHandlers` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> |

#### Returns

[`KeywordSpotter`](/docs/api/classes/keywordspotter)

#### Inherited from

[`VoiceController`](/docs/api/classes/voicecontroller).[`constructor`](/docs/api/classes/voicecontroller#constructors)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [`VoiceController`](/docs/api/classes/voicecontroller).[`commandHandlers`](/docs/api/classes/voicecontroller#commandhandlers-1) | [voiceController.ts:13](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L13) |
| <a id="onerror"></a> `onError` | (`error`: `any`) => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onError`](/docs/api/classes/voicecontroller#onerror) | [voiceController.ts:16](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onModelLoaded`](/docs/api/classes/voicecontroller#onmodelloaded) | [voiceController.ts:18](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L18) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onModelLoadStarted`](/docs/api/classes/voicecontroller#onmodelloadstarted) | [voiceController.ts:17](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="onpermissionsrequested"></a> `onPermissionsRequested` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onPermissionsRequested`](/docs/api/classes/voicecontroller#onpermissionsrequested) | [voiceController.ts:15](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onSpeechEnd`](/docs/api/classes/voicecontroller#onspeechend) | [voiceController.ts:24](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L24) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onSpeechStart`](/docs/api/classes/voicecontroller#onspeechstart) | [voiceController.ts:23](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L23) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscribeStarted`](/docs/api/classes/voicecontroller#ontranscribestarted) | [voiceController.ts:19](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L19) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscribeStopped`](/docs/api/classes/voicecontroller#ontranscribestopped) | [voiceController.ts:20](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L20) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscriptionCommitted`](/docs/api/classes/voicecontroller#ontranscriptioncommitted) | [voiceController.ts:21](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L21) |

## Methods

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:90](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L90)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`void`

#### Overrides

```ts
VoiceController.onTranscriptionUpdated
```

***

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

#### Inherited from

[`VoiceController`](/docs/api/classes/voicecontroller).[`normalizeText`](/docs/api/classes/voicecontroller#normalizetext)

