// import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"
// uncomment to use latest build in this repo
import * as Moonshine from "@usefulsensors/moonshine-js"

const state = document.getElementById("state")
const button = document.getElementById("button")
const history = document.getElementById("history")
var pastText = ""

const chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
        labels: [],
        datasets: [
            {
                label: "Raw Value",
                borderColor: "lightblue",
                data: [],
                fill: false,
            },
            {
                label: "EMA (10)",
                borderColor: "orange",
                data: [],
                fill: false,
            },
            {
                label: "Commits",
                borderColor: "red",
                data: [],
                fill: false
            }
        ],
    },
    options: {
        responsive: true,
        animation: false,
        scales: {
            x: { title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Value", min: 0.0, max: 1.0 } },
        },
    },
});

let counter = 0;
Moonshine.Settings.STREAM_COMMIT_EMA_PERIOD = 5;
// Moonshine.Settings.VERBOSE_LOGGING = true;

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
    onFrame(p, f, e) {
        chart.data.labels.push(counter);
        chart.data.datasets[0].data.push(p.isSpeech);
        chart.data.datasets[1].data.push(e);

        if (chart.data.labels.length > 50) {
            chart.data.labels.shift();
            chart.data.datasets.forEach(ds => ds.data.shift());
        }

        chart.update();
        counter++;
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
