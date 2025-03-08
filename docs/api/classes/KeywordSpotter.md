undefined
# Class: KeywordSpotter

Defined in: [voiceController.ts:60](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L60)

Implements voice control using basic keyword spotting. 

Keyword spotting is most useful in cases where we need to match EXACT user command phrases to actions 
with no ambiguity, e.g., matching the exact words "scroll up" to a scroll up action.

## Extends

- [`VoiceController`](/docs/api/classes/VoiceController)

## Constructors

### new KeywordSpotter()

```ts
new KeywordSpotter(commandHandlers, callbacks): KeywordSpotter
```

Defined in: [voiceController.ts:21](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commandHandlers` | `CommandHandlers` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/api/interfaces/TranscriberCallbacks)\> |

#### Returns

[`KeywordSpotter`](/docs/api/classes/KeywordSpotter)

#### Inherited from

[`VoiceController`](/docs/api/classes/VoiceController).[`constructor`](/docs/api/classes/VoiceController.md#constructors)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="commandhandlers-1"></a> `commandHandlers` | `CommandHandlers` | [`VoiceController`](/docs/api/classes/VoiceController).[`commandHandlers`](/docs/api/classes/VoiceController.md#commandhandlers-1) | [voiceController.ts:12](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L12) |
| <a id="onmodelloaded"></a> `onModelLoaded` | () => `any` | [`VoiceController`](/docs/api/classes/VoiceController).[`onModelLoaded`](/docs/api/classes/VoiceController.md#onmodelloaded) | [voiceController.ts:15](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L15) |
| <a id="onmodelloadstarted"></a> `onModelLoadStarted` | () => `any` | [`VoiceController`](/docs/api/classes/VoiceController).[`onModelLoadStarted`](/docs/api/classes/VoiceController.md#onmodelloadstarted) | [voiceController.ts:14](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L14) |
| <a id="ontranscribestarted"></a> `onTranscribeStarted` | () => `any` | [`VoiceController`](/docs/api/classes/VoiceController).[`onTranscribeStarted`](/docs/api/classes/VoiceController.md#ontranscribestarted) | [voiceController.ts:16](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L16) |
| <a id="ontranscribestopped"></a> `onTranscribeStopped` | () => `any` | [`VoiceController`](/docs/api/classes/VoiceController).[`onTranscribeStopped`](/docs/api/classes/VoiceController.md#ontranscribestopped) | [voiceController.ts:17](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L17) |
| <a id="ontranscriptioncommitted"></a> `onTranscriptionCommitted` | (`text`: `string`) => `any` | [`VoiceController`](/docs/api/classes/VoiceController).[`onTranscriptionCommitted`](/docs/api/classes/VoiceController.md#ontranscriptioncommitted) | [voiceController.ts:18](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L18) |

## Methods

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:61](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L61)

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

