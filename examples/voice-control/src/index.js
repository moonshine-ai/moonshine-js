import { MicrophoneTranscriber, MoonshineSettings, KeywordSpotter } from "@usefulsensors/moonshine-js";

MoonshineSettings.MAX_SPEECH_SECS = 2
MoonshineSettings.FRAME_SIZE = 100
MoonshineSettings.BASE_ASSET_PATH = "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/";

var keywordSpotter = new KeywordSpotter({
    "turn on": () => {
        document.querySelector("body").style.backgroundColor = "white"
    },
    "turn off": () => {
        document.querySelector("body").style.backgroundColor = "black"
    }
})

var transcriber = new MicrophoneTranscriber(
    "model/tiny",
    keywordSpotter,
    true
);

document.getElementById("startButton").addEventListener("click", () => {
    transcriber.start()
})

document.getElementById("stopButton").addEventListener("click", () => {
    transcriber.stop()
})
