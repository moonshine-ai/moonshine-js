undefined
# Class: IntentClassifier

Defined in: [voiceController.ts:86](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L86)

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

Defined in: [voiceController.ts:162](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L162)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `commandHandlers` | `CommandHandlers` | `undefined` |  |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/transcribercallbacks)\> | `{}` |  |
| `embeddingsModel` | `string` | `'Xenova/all-MiniLM-L6-v2'` |  |
| `preComputedEmbeddings` | `string` | `undefined` |  |

#### Returns

[`IntentClassifier`](/docs/api/classes/intentclassifier)

#### Overrides

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

### getCosineSimilarityScores()

```ts
getCosineSimilarityScores(embeddings): any[]
```

Defined in: [voiceController.ts:140](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L140)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `embeddings` | `any` |

#### Returns

`any`[]

***

### getEmbeddings()

```ts
getEmbeddings(text): Promise<any>
```

Defined in: [voiceController.ts:126](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L126)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`Promise`\<`any`\>

***

### getIntent()

```ts
getIntent(text): Promise<string>
```

Defined in: [voiceController.ts:148](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L148)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`Promise`\<`string`\>

***

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:183](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L183)

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

### preComputeIntentEmbeddings()

```ts
preComputeIntentEmbeddings(intents): Promise<any[]>
```

Defined in: [voiceController.ts:131](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L131)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `intents` | `string`[] |

#### Returns

`Promise`\<`any`[]\>

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

