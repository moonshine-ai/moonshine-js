undefined
# Class: KeywordSpotter

Defined in: [voiceController.ts:67](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L67)

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

Defined in: [voiceController.ts:24](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L24)

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
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [`VoiceController`](/docs/api/classes/voicecontroller).[`commandHandlers`](/docs/api/classes/voicecontroller#commandhandlers-1) | [voiceController.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L13) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onModelLoaded`](/docs/api/classes/voicecontroller#onmodelloaded) | [voiceController.ts:16](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onModelLoadStarted`](/docs/api/classes/voicecontroller#onmodelloadstarted) | [voiceController.ts:15](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onSpeechEnd`](/docs/api/classes/voicecontroller#onspeechend) | [voiceController.ts:22](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L22) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onSpeechStart`](/docs/api/classes/voicecontroller#onspeechstart) | [voiceController.ts:21](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L21) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscribeStarted`](/docs/api/classes/voicecontroller#ontranscribestarted) | [voiceController.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscribeStopped`](/docs/api/classes/voicecontroller#ontranscribestopped) | [voiceController.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L18) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [`VoiceController`](/docs/api/classes/voicecontroller).[`onTranscriptionCommitted`](/docs/api/classes/voicecontroller#ontranscriptioncommitted) | [voiceController.ts:19](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L19) |

## Methods

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:68](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L68)

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

Defined in: [voiceController.ts:56](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L56)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`string`

#### Inherited from

[`VoiceController`](/docs/api/classes/voicecontroller).[`normalizeText`](/docs/api/classes/voicecontroller#normalizetext)

