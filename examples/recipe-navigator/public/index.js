import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@0.1.10/dist/moonshine.min.js";

Moonshine.Settings.MAX_SPEECH_SECS = 2
Moonshine.Settings.MAX_RECORD_MS = undefined
Moonshine.Settings.FRAME_SIZE = 100
Moonshine.Settings.VERBOSE_LOGGING = true

function scrollToElement(e) {
    const lastActive = document.querySelector(".text-success")
    if (lastActive)
        lastActive.classList.remove("text-success")
    e.classList.add("text-success")
    e.scrollIntoView()
}

var scrollables = {}

document.querySelectorAll(".scrollable").forEach((e) => {
    scrollables[e.id.replace("-", " ")] = e
})

const commandHandlers = {
    "scroll, go to, move to, or display a section": (command) => {
        Object.keys(scrollables).forEach((k) => {
            if (command.includes(k)) {
                scrollToElement(scrollables[k])
            }
        })
    }
}

const callbacks = {
    onModelLoadStarted() {
        document.getElementById("startButton").innerHTML = "Loading"
        document.getElementById("startButton").disabled = true
    },
    onTranscribeStarted() {
        document.getElementById("startButton").innerHTML = "Disable"
        document.getElementById("startButton").disabled = false
    },
    onTranscribeStopped() {
        document.getElementById("startButton").innerHTML = "Enable"
    }
}

var intentClassifier = new Moonshine.IntentClassifier(commandHandlers, callbacks)

var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny",
    intentClassifier,
    true
);

document.getElementById("startButton").addEventListener("click", () => {
    if (!transcriber.isActive) {
        transcriber.start()
    }
    else {
        transcriber.stop()
    }
})
