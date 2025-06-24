[Home](/docs/globals.md) / MoonshineSpeechRecognition

# Class: MoonshineSpeechRecognition

Defined in: [webSpeechPolyfill.ts:95](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L95)

## Implements

- `SpeechRecognition`

## Constructors

### new MoonshineSpeechRecognition()

```ts
new MoonshineSpeechRecognition(modelURL): MoonshineSpeechRecognition
```

Defined in: [webSpeechPolyfill.ts:98](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L98)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `modelURL` | `string` | `"model/tiny"` |

#### Returns

[`MoonshineSpeechRecognition`](/docs/classes/MoonshineSpeechRecognition.md)

## Properties

| Property | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="continuous"></a> `continuous` | `boolean` | `undefined` | [webSpeechPolyfill.ts:102](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L102) |
| <a id="grammars"></a> `grammars` | `SpeechGrammarList` | `undefined` | [webSpeechPolyfill.ts:104](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L104) |
| <a id="interimresults"></a> `interimResults` | `boolean` | `undefined` | [webSpeechPolyfill.ts:105](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L105) |
| <a id="lang"></a> `lang` | `string` | `undefined` | [webSpeechPolyfill.ts:106](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L106) |
| <a id="maxalternatives"></a> `maxAlternatives` | `number` | `undefined` | [webSpeechPolyfill.ts:107](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L107) |
| <a id="resultindex"></a> `resultIndex` | `number` | `0` | [webSpeechPolyfill.ts:158](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L158) |

## Accessors

### onaudioend

#### Set Signature

```ts
set onaudioend(handler): void
```

Defined in: [webSpeechPolyfill.ts:138](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L138)

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

Defined in: [webSpeechPolyfill.ts:132](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L132)

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

Defined in: [webSpeechPolyfill.ts:144](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L144)

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

Defined in: [webSpeechPolyfill.ts:150](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L150)

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

Defined in: [webSpeechPolyfill.ts:154](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L154)

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

Defined in: [webSpeechPolyfill.ts:160](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L160)

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

Defined in: [webSpeechPolyfill.ts:201](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L201)

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

Defined in: [webSpeechPolyfill.ts:195](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L195)

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

Defined in: [webSpeechPolyfill.ts:213](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L213)

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

Defined in: [webSpeechPolyfill.ts:207](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L207)

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

Defined in: [webSpeechPolyfill.ts:219](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L219)

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

Defined in: [webSpeechPolyfill.ts:128](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L128)

#### Returns

`void`

***

### addEventListener()

```ts
addEventListener(...args): void
```

Defined in: [webSpeechPolyfill.ts:225](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L225)

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

Defined in: [webSpeechPolyfill.ts:116](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L116)

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

Defined in: [webSpeechPolyfill.ts:109](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L109)

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

Defined in: [webSpeechPolyfill.ts:120](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L120)

#### Returns

`void`

***

### stop()

```ts
stop(): void
```

Defined in: [webSpeechPolyfill.ts:124](https://github.com/usefulsensors/moonshine-js/blob/main/src/webSpeechPolyfill.ts#L124)

#### Returns

`void`
