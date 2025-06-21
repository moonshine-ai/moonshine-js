import * as Moonshine from "https://cdn.jsdelivr.net/npm/@moonshine-ai/moonshine-js@latest/dist/moonshine.min.js"
// uncomment to use latest build in this repo
// import * as Moonshine from "@moonshine-ai/moonshine-js"

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
        } else if (e == Moonshine.MoonshineError.NotReceivingAudioInput) {
            state.innerHTML = "Not receiving audio input."
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
    },
}

var microphoneTranscriber = new Moonshine.MicrophoneTranscriber(
    "model/base",
    callbacks,
    false
);
// Start loading the models before the user clicks the button. This
// isn't strictly necessary since .start() will load the model if it's not
// already loaded, but it's a good idea to do it in advance so that the user
// doesn't have to wait for the model to load when they click the button.
microphoneTranscriber.load();

var videoTranscriber = new Moonshine.MediaElementTranscriber(
    document.getElementById("video"),
    "model/base",
    callbacks,
    false // use streaming mode, rather than VAD chunks
);
videoTranscriber.load();

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
