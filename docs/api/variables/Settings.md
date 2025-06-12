undefined
# Variable: Settings

```ts
const Settings: {
  BASE_ASSET_PATH: {
     MOONSHINE: string;
     ONNX_RUNTIME: string;
     SILERO_VAD: string;
    };
  FRAME_SIZE: number;
  MAX_RECORD_MS: number;
  MAX_SPEECH_SECS: number;
  VERBOSE_LOGGING: boolean;
};
```

Defined in: [constants.ts:4](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L4)

Global settings for MoonshineJS.

## Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="base_asset_path"></a> `BASE_ASSET_PATH` | \{ `MOONSHINE`: `string`; `ONNX_RUNTIME`: `string`; `SILERO_VAD`: `string`; \} | - | [constants.ts:8](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L8) |
| `BASE_ASSET_PATH.MOONSHINE` | `string` | "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/" | [constants.ts:9](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L9) |
| `BASE_ASSET_PATH.ONNX_RUNTIME` | `string` | "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/" | [constants.ts:10](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L10) |
| `BASE_ASSET_PATH.SILERO_VAD` | `string` | "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@latest/dist/" | [constants.ts:11](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L11) |
| <a id="frame_size"></a> `FRAME_SIZE` | `number` | 250 | [constants.ts:5](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L5) |
| <a id="max_record_ms"></a> `MAX_RECORD_MS` | `number` | 60000 | [constants.ts:7](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L7) |
| <a id="max_speech_secs"></a> `MAX_SPEECH_SECS` | `number` | 5 | [constants.ts:6](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L6) |
| <a id="verbose_logging"></a> `VERBOSE_LOGGING` | `boolean` | false | [constants.ts:13](https://github.com/usefulsensors/moonshine-js/blob/main/src/constants.ts#L13) |

