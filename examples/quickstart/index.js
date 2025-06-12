import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"

const state = document.getElementById("state")
const button = document.getElementById("button")

var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny",
    {
        onPermissionsRequested() {
            state.innerHTML = "Requesting permissions."
        },
        onError(e) {
            if (e == Moonshine.MoonshineError.PermissionDenied) {
                state.innerHTML = "Permission denied."
            }
        },
        onModelLoadStarted() {
            state.innerHTML = "Model loading."
        },
        onModelLoaded() {
            state.innerHTML = "Model loaded."
        },
        onTranscribeStarted() {
            state.innerHTML = "Started. Waiting for speech."
        },
        onSpeechStart() {
            state.innerHTML = "Speech started. Listening."
        },
        onSpeechEnd() {
            state.innerHTML = "Speech ended."
        },
        onTranscriptionUpdated(text) {
            if (text) {
                state.innerHTML = "Transcript: " + text
            }
        },
        onTranscribeStopped() {
            state.innerHTML = "Stopped."
        }
    },
    false // use streaming mode, rather than VAD chunks
);

button.addEventListener("click", () => {
    if (transcriber.isActive) {
        transcriber.stop()
        button.innerText = "Start"
    }
    else {
        transcriber.start()
        button.innerText = "Stop"
    }
})