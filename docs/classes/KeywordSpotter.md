[Home](/docs/globals.md) / KeywordSpotter

# Class: KeywordSpotter

Defined in: [voiceController.ts:95](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L95)

Implements voice control using basic keyword spotting.

Keyword spotting is most useful in cases where we need to match EXACT user command phrases to actions
with no ambiguity, e.g., matching the exact words "scroll up" to a scroll up action.

## Extends

- [`VoiceController`](/docs/classes/VoiceController.md)

## Constructors

### new KeywordSpotter()

```ts
new KeywordSpotter(commandHandlers, callbacks): KeywordSpotter
```

Defined in: [voiceController.ts:27](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L27)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `commandHandlers` | `CommandHandlers` |
| `callbacks` | `Partial`\<[`TranscriberCallbacks`](/docs/interfaces/TranscriberCallbacks.md)\> |

#### Returns

[`KeywordSpotter`](/docs/classes/KeywordSpotter.md)

#### Inherited from

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

### onTranscriptionUpdated()

```ts
onTranscriptionUpdated(text): void
```

Defined in: [voiceController.ts:96](https://github.com/usefulsensors/moonshine-js/blob/main/src/voiceController.ts#L96)

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
