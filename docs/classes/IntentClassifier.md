[Home](/docs/globals.md) / IntentClassifier

# Class: IntentClassifier

Defined in: [voiceController.ts:114](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L114)

Implements voice control using intent classification.

Intent classification matches user commands to actions using semantic similarity. This is most useful
when we want to match commands with similar meaning (but not identical wordings) to desired actions, e.g.,
matching the commands to "start up", "initialize", and "boot it up" to an intent named "turn on".

## Extends

- [`VoiceController`](/docs/classes/VoiceController.md)

## Constructors

### new IntentClassifier()

```ts
new IntentClassifier(
   commandHandlers, 
   callbacks, 
   embeddingsModel, 
   preComputedEmbeddings): IntentClassifier
```

Defined in: [voiceController.ts:233](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L233)

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `commandHandlers` | `CommandHandlers` | `undefined` |  |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md)\> | `{}` |  |
| `embeddingsModel` | `string` | `"Xenova/all-MiniLM-L6-v2"` |  |
| `preComputedEmbeddings` | `string` | `undefined` |  |

#### Returns

[`IntentClassifier`](/docs/classes/IntentClassifier.md)

#### Overrides

[`VoiceController`](/docs/classes/VoiceController.md).[`constructor`](/docs/classes/VoiceController.md#constructors)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [`VoiceController`](/docs/classes/VoiceController.md).[`commandHandlers`](/docs/classes/VoiceController.md#commandhandlers-1) | [voiceController.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L13) |
| <a id="onerror"></a> `onError` | (`error`: `any`) => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onError`](/docs/classes/VoiceController.md#onerror) | [voiceController.ts:16](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="onframe"></a> `onFrame` | (`probs`: `any`, `frame`: `any`, `ema`: `any`) => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onFrame`](/docs/classes/VoiceController.md#onframe) | [voiceController.ts:23](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L23) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onModelLoaded`](/docs/classes/VoiceController.md#onmodelloaded) | [voiceController.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L18) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onModelLoadStarted`](/docs/classes/VoiceController.md#onmodelloadstarted) | [voiceController.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="onpermissionsrequested"></a> `onPermissionsRequested` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onPermissionsRequested`](/docs/classes/VoiceController.md#onpermissionsrequested) | [voiceController.ts:15](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onspeechend"></a> `onSpeechEnd` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onSpeechEnd`](/docs/classes/VoiceController.md#onspeechend) | [voiceController.ts:25](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L25) |
| <a id="onspeechstart"></a> `onSpeechStart` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onSpeechStart`](/docs/classes/VoiceController.md#onspeechstart) | [voiceController.ts:24](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L24) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onTranscribeStarted`](/docs/classes/VoiceController.md#ontranscribestarted) | [voiceController.ts:19](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L19) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onTranscribeStopped`](/docs/classes/VoiceController.md#ontranscribestopped) | [voiceController.ts:20](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L20) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [`VoiceController`](/docs/classes/VoiceController.md).[`onTranscriptionCommitted`](/docs/classes/VoiceController.md#ontranscriptioncommitted) | [voiceController.ts:21](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L21) |

## Methods

### getAllEmbeddings()

```ts
getAllEmbeddings(intents): Promise<any[]>
```

Defined in: [voiceController.ts:171](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L171)

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

Defined in: [voiceController.ts:185](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L185)

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

Defined in: [voiceController.ts:158](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L158)

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

Defined in: [voiceController.ts:214](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L214)

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

Defined in: [voiceController.ts:199](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L199)

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

Defined in: [voiceController.ts:255](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L255)

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

Defined in: [voiceController.ts:84](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L84)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `text` | `string` |

#### Returns

`string`

#### Inherited from

[`VoiceController`](/docs/classes/VoiceController.md).[`normalizeText`](/docs/classes/VoiceController.md#normalizetext)
