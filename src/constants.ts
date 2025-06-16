const frameSize = 512
const updateInterval = 16
const vadCommitSeconds = 10

/**
 * Global settings for MoonshineJS.
 */
export const Settings = {
    FRAME_SIZE: frameSize, // as specified by silero v5; changing this is not recommended
    STREAM_UPDATE_INTERVAL: updateInterval,
    STREAM_COMMIT_INTERVAL: updateInterval * 6,
    VAD_COMMIT_INTERVAL: Math.ceil((vadCommitSeconds * 10000) / frameSize),
    BASE_ASSET_PATH: {
        MOONSHINE: "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/",
        ONNX_RUNTIME: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
        SILERO_VAD: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@latest/dist/"
    },
    VERBOSE_LOGGING: false
}
