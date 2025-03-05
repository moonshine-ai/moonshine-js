import { useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MicrophoneTranscriber, MoonshineSettings } from "@usefulsensors/moonshine-js"
// import { MicrophoneTranscriber, MoonshineSettings } from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"
// Set the asset path to the CDN root (so the models are fetched from there)
MoonshineSettings.BASE_ASSET_PATH = "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/";
MoonshineSettings.MAX_SPEECH_SECS = 2
MoonshineSettings.FRAME_SIZE = 100

function App() {
  const models = [
    "model/tiny",
    "model/base"
  ]
  const [model, setModel] = useState("model/tiny")
  const [isRunning, setIsRunning] = useState(false)
  const [streaming, setUseVAD] = useState(false)
  const [infoText, setInfoText] = useState("")
  const [pastText, setPastText] = useState("")
  const [newText, setNewText] = useState("")
  const transcriber = useRef(undefined);

  function toggle() {
    if (transcriber.current === undefined) {
      console.log("model: " + model)
      console.log("streaming: " + streaming)
      transcriber.current = new MicrophoneTranscriber(
        model,
        {
          onModelLoadStarted: () => {
            setInfoText("Model loading...")
          },
          onModelLoaded: () => {
            setInfoText("Speak to begin.")
          },
          onTranscribeStarted: () => {
            setInfoText("Transcribing...")
          },
          onTranscribeStopped: () => {
            setInfoText("")
          },
          onTranscriptionUpdated: (text) => {
            setNewText(text)
          },
          onTranscriptionCommitted: (text) => {
            setPastText(text + " ")
          }
        },
        !streaming
      )
    }

    if (isRunning) {
      transcriber.current.stop()
    }
    else {
      transcriber.current.start()
    }
    var running = isRunning
    setIsRunning(!running)
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div>
          <svg version="1.1" id="logo" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 800 800" >
            <path className="st0" d="M409,760C205.6,760,40,594.4,40,390.9C40,228.5,144.4,88.5,294.8,40C236.6,100.9,203,182.9,203,268.3
                c0,181.7,147.3,329.5,328.3,329.5c85.8,0,168.1-34.2,228.8-93.4C711.9,655.3,571.8,760,409,760L409,760z"/>
            <line className="st1" id="l1" x1="310.1" y1="293.8" x2="310.1" y2="325.8"/>
            <line className="st1" id="l2" x1="729.8" y1="293.8" x2="729.8" y2="325.8"/>
            <line className="st1" id="l3" x1="370" y1="220" x2="370" y2="399.6"/>
            <line className="st1" id="l4" x1="430" y1="245.9" x2="430" y2="373.7"/>
            <line className="st1" id="l5" x1="489.9" y1="293.8" x2="489.9" y2="325.8"/>
            <line className="st1" id="l6" x1="548.1" y1="278.2" x2="548.1" y2="342.1"/>
            <line className="st1" id="l7" x1="609.9" y1="220.4" x2="609.9" y2="400"/>
            <line className="st1" id="l8" x1="669.8" y1="245.9" x2="669.8" y2="373.7"/>
          </svg>
        </div>
        <h1>Moonshine.js</h1>
        <p>fast, accurate, and lightweight speech-to-text models running in your browser</p>
      </div>
      <div className="row justify-content-center align-items-center">
          <div className="mb-1 col-lg-2">
            <select className="form-select" name="models" id="models" onChange={(e) => setModel(e.target.value)}
            defaultValue={model}>
              {
                models.map((e, i) => {
                  return <option key={i} value={e}>{e}</option>
                })
              }
            </select>
          </div>
          <div className="mb-1 col-lg-2">
            <div className="form-check form-switch text-start">
              <input className="form-check-input" type="checkbox" role="switch" id="mode" defaultChecked={streaming} onChange={e => setUseVAD((streaming) => !streaming)}/>
              <label className="form-check-label" for="mode">
                Streaming mode
              </label>
            </div>
          </div>
        <div className="mb-1 col-lg-1">
          <button className="btn btn-primary" id="toggle" onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
        </div>
      </div>
      <div>
        <div className="row justify-content-center">
          <span className="text-success">{infoText}</span>
        </div>
        <span className="text-secondary">
          {pastText}
        </span>
        <span id="transcription">
          {newText}
        </span>
      </div>
    </div>
  );
}

export default App;
