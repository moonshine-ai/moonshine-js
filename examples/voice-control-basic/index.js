import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"

var keywordSpotter = new Moonshine.KeywordSpotter(
    {
        "turn on": () => {
            document.body.style.backgroundColor = "#ffffff"
        },
        "turn off": () => {
            document.body.style.backgroundColor = "#000000"
        }
    },
    {
        onModelLoadStarted() {
            document.getElementById("infoText").innerHTML = "Loading..."
        },
        onModelLoaded() {
            document.getElementById("infoText").innerHTML = "Ready."
        },
        onSpeechStart() {
            document.getElementById("infoText").innerHTML = "Listening."
        },
        onSpeechEnd() {
            document.getElementById("infoText").innerHTML = "Ready."
        },
        onTranscribeStarted() {
            document.getElementById("infoText").innerHTML = "Ready."
        },
        onTranscribeStopped() {
            document.getElementById("infoText").innerHTML = "Stopped."
        }
    })

var transcriber = new Moonshine.MicrophoneTranscriber(
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
