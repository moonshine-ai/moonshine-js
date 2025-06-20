undefined
# Class: IntentClassifier

Defined in: [voiceController.ts:108](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L108)

Implements voice control using intent classification.

Intent classification matches user commands to actions using semantic similarity. This is most useful
when we want to match commands with similar meaning (but not identical wordings) to desired actions, e.g.,
matching the commands to "start up", "initialize", and "boot it up" to an intent named "turn on".

## Extends

- [`VoiceController`](/docs/api/classes/voicecontroller)

## Constructors

### new IntentClassifier()

```ts
new IntentClassifier(
   commandHandlers, 
   callbacks, 
   embeddingsModel, 
   preComputedEmbeddings): IntentClassifier
```

Defined in: [voiceController.ts:228](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L228)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `commandHandlers` | `CommandHandlers` | `undefined` |  |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` |  |
| `embeddingsModel` | `string` | `"Xenova/all-MiniLM-L6-v2"` |  |
| `preComputedEmbeddings` | `string` | `undefined` |  |

#### Returns

[`IntentClassifier`](/docs/api/classes/intentclassifier)

#### Overrides

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

### getAllEmbeddings()

```ts
getAllEmbeddings(intents): Promise<any[]>
```

Defined in: [voiceController.ts:166](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L166)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `intents` | `string`[] |  |

#### Returns

`Promise`\<`any`[]\>

***

### getCosineSimilarityScores()

```ts
getCosineSimilarityScores(embeddings, allEmbeddings): any[]
```

Defined in: [voiceController.ts:180](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L180)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `embeddings` | `any` |  |
| `allEmbeddings` | `any` | - |

#### Returns

`any`[]

***

### getEmbeddings()

```ts
getEmbeddings(text): Promise<any>
```

Defined in: [voiceController.ts:153](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L153)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` |  |

#### Returns

`Promise`\<`any`\>

***

### getIntent()

```ts
getIntent(text): Promise<string>
```

Defined in: [voiceController.ts:209](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L209)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` |  |

#### Returns

`Promise`\<`string`\>

***

### getMostSimilar()

```ts
getMostSimilar(text, candidates): Promise<string>
```

Defined in: [voiceController.ts:194](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L194)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` |  |
| `candidates` | `string`[] |  |

#### Returns

`Promise`\<`string`\>

***

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:250](https://github.com/moonshine-ai/moonshine-js/blob/main/src/voiceController.ts#L250)

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

