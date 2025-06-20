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
  STREAM_COMMIT_INTERVAL: number;
  STREAM_UPDATE_INTERVAL: number;
  VAD_COMMIT_INTERVAL: number;
  VERBOSE_LOGGING: boolean;
};
```

Defined in: [constants.ts:8](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L8)

Global settings for MoonshineJS.

## Type declaration

| Name | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="base_asset_path"></a> `BASE_ASSET_PATH` | \{ `MOONSHINE`: `string`; `ONNX_RUNTIME`: `string`; `SILERO_VAD`: `string`; \} | - | [constants.ts:13](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L13) |
| `BASE_ASSET_PATH.MOONSHINE` | `string` | "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/" | [constants.ts:14](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L14) |
| `BASE_ASSET_PATH.ONNX_RUNTIME` | `string` | "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/" | [constants.ts:15](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L15) |
| `BASE_ASSET_PATH.SILERO_VAD` | `string` | "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@latest/dist/" | [constants.ts:16](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L16) |
| <a id="frame_size"></a> `FRAME_SIZE` | `number` | frameSize | [constants.ts:9](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L9) |
| <a id="stream_commit_interval"></a> `STREAM_COMMIT_INTERVAL` | `number` | - | [constants.ts:11](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L11) |
| <a id="stream_update_interval"></a> `STREAM_UPDATE_INTERVAL` | `number` | updateInterval | [constants.ts:10](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L10) |
| <a id="vad_commit_interval"></a> `VAD_COMMIT_INTERVAL` | `number` | - | [constants.ts:12](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L12) |
| <a id="verbose_logging"></a> `VERBOSE_LOGGING` | `boolean` | false | [constants.ts:18](https://github.com/moonshine-ai/moonshine-js/blob/main/src/constants.ts#L18) |

