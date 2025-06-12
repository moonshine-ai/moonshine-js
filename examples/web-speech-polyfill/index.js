import * as Moonshine from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js";

var transcriber = new Moonshine.MoonshineSpeechRecognition()

const status = document.getElementById("status")
const output = document.getElementById("output")

transcriber.addEventListener("speechstart", () => {
    console.log("speechstart")
    status.innerHTML = "speechstart"
})

transcriber.addEventListener("speechend", () => {
    console.log("speechend")
    status.innerHTML = "speechend"
})

transcriber.onstart = () => {
    console.log("start")
    status.innerHTML = "start"
}

transcriber.addEventListener("end", () => {
    console.log("end")
    status.innerHTML = "end"
})

transcriber.addEventListener("result", (e) => {
    console.log("result:", e.results[0][0].transcript);
    status.innerHTML = "result"
    output.innerHTML = e.results[0][0].transcript
})

document.getElementById("startButton").addEventListener("click", () => {
    transcriber.start()
})

document.getElementById("stopButton").addEventListener("click", () => {
    transcriber.stop()
})
