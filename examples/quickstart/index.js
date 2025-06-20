import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"
// uncomment to use latest build in this repo
// import * as Moonshine from "@usefulsensors/moonshine-js"

const state = document.getElementById("state")
const button = document.getElementById("button")
const history = document.getElementById("history")
var pastText = ""

const callbacks = {
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
    onTranscriptionCommitted(text) {
        if (text) {
            state.innerHTML = "Transcript committed."
            pastText = `${pastText} <br> ${text}`
            history.innerHTML = pastText
        }
    },
    onTranscriptionUpdated(text) {
        if (text) {
            state.innerHTML = "Transcript updated."
            history.innerHTML = `${pastText} <br> ${text}`
        }
    },
    onTranscribeStopped() {
        state.innerHTML = "Stopped."
    }
}

var microphoneTranscriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny",
    callbacks,
    false
);

var videoTranscriber = new Moonshine.MediaElementTranscriber(
    document.getElementById("video"),
    "model/tiny",
    callbacks,
    false // use streaming mode, rather than VAD chunks
);

button.addEventListener("click", () => {
    if (microphoneTranscriber.isActive) {
        microphoneTranscriber.stop()
        button.innerText = "Start"
    }
    else {
        microphoneTranscriber.start()
        button.innerText = "Stop"
    }
})
