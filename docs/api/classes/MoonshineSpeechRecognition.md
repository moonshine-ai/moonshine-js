undefined
# Class: MoonshineSpeechRecognition

Defined in: [webSpeechPolyfill.ts:94](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L94)

## Implements

- `SpeechRecognition`

## Constructors

### new MoonshineSpeechRecognition()

```ts
new MoonshineSpeechRecognition(modelURL): MoonshineSpeechRecognition
```

Defined in: [webSpeechPolyfill.ts:97](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L97)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `modelURL` | `string` | `"model/tiny"` |

#### Returns

[`MoonshineSpeechRecognition`](/docs/api/classes/moonshinespeechrecognition)

## Properties

| Property | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="continuous"></a> `continuous` | `boolean` | `undefined` | [webSpeechPolyfill.ts:101](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L101) |
| <a id="grammars"></a> `grammars` | `SpeechGrammarList` | `undefined` | [webSpeechPolyfill.ts:102](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L102) |
| <a id="interimresults"></a> `interimResults` | `boolean` | `undefined` | [webSpeechPolyfill.ts:103](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L103) |
| <a id="lang"></a> `lang` | `string` | `undefined` | [webSpeechPolyfill.ts:104](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L104) |
| <a id="maxalternatives"></a> `maxAlternatives` | `number` | `undefined` | [webSpeechPolyfill.ts:105](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L105) |
| <a id="resultindex"></a> `resultIndex` | `number` | `0` | [webSpeechPolyfill.ts:156](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L156) |

## Accessors

### onaudioend

#### Set Signature

```ts
set onaudioend(handler): void
```

Defined in: [webSpeechPolyfill.ts:136](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L136)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onaudiostart

#### Set Signature

```ts
set onaudiostart(handler): void
```

Defined in: [webSpeechPolyfill.ts:130](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L130)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onend

#### Set Signature

```ts
set onend(handler): void
```

Defined in: [webSpeechPolyfill.ts:142](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L142)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onerror

#### Set Signature

```ts
set onerror(handler): void
```

Defined in: [webSpeechPolyfill.ts:148](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L148)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`SpeechRecognitionErrorEvent`) => `void` |

##### Returns

`void`

***

### onnomatch

#### Set Signature

```ts
set onnomatch(handler): void
```

Defined in: [webSpeechPolyfill.ts:152](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L152)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`SpeechRecognitionEvent`) => `void` |

##### Returns

`void`

***

### onresult

#### Set Signature

```ts
set onresult(handler): void
```

Defined in: [webSpeechPolyfill.ts:158](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L158)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`SpeechRecognitionEvent`) => `void` |

##### Returns

`void`

***

### onsoundend

#### Set Signature

```ts
set onsoundend(handler): void
```

Defined in: [webSpeechPolyfill.ts:199](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L199)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onsoundstart

#### Set Signature

```ts
set onsoundstart(handler): void
```

Defined in: [webSpeechPolyfill.ts:193](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L193)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onspeechend

#### Set Signature

```ts
set onspeechend(handler): void
```

Defined in: [webSpeechPolyfill.ts:211](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L211)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onspeechstart

#### Set Signature

```ts
set onspeechstart(handler): void
```

Defined in: [webSpeechPolyfill.ts:205](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L205)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

***

### onstart

#### Set Signature

```ts
set onstart(handler): void
```

Defined in: [webSpeechPolyfill.ts:217](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L217)

##### Parameters

| Parameter | Type |
| ------ | ------ |
| `handler` | (`Event`) => `void` |

##### Returns

`void`

## Methods

### abort()

```ts
abort(): void
```

Defined in: [webSpeechPolyfill.ts:126](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L126)

#### Returns

`void`

***

### addEventListener()

```ts
addEventListener(...args): void
```

Defined in: [webSpeechPolyfill.ts:223](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L223)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`args` | `any` |

#### Returns

`void`

***

### dispatchEvent()

```ts
dispatchEvent(event): boolean
```

Defined in: [webSpeechPolyfill.ts:114](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L114)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `event` | `Event` |

#### Returns

`boolean`

***

### removeEventListener()

```ts
removeEventListener(
   type, 
   listener, 
   options?): void
```

Defined in: [webSpeechPolyfill.ts:107](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L107)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `type` | `unknown` |
| `listener` | `unknown` |
| `options`? | `unknown` |

#### Returns

`void`

***

### start()

```ts
start(): void
```

Defined in: [webSpeechPolyfill.ts:118](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L118)

#### Returns

`void`

***

### stop()

```ts
stop(): void
```

Defined in: [webSpeechPolyfill.ts:122](https://github.com/moonshine-ai/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L122)

#### Returns

`void`

