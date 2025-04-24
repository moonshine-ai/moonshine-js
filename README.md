# Moonshine.js

Moonshine.js makes it easy for web developers to build modern, speech-driven web experiences without sacrificing user privacy. We build on three key principles:

- **Fast Transcription**: simply connect a WebAudio-compliant media stream from any browser audio source and generate rapid transcriptions of speech.
- **Easy Voice Control**: build feature-rich voice-controlled web apps in < 10 lines of code.
- **Local Processing**: all audio processing happens locally in the user's web browser---no cloud services or privacy violations required.

_Note: This package is currently in beta, and breaking changes may occur between versions. User feedback and developer contributions are welcome._

## Installation

You can use Moonshine.js via CDN, or you can install it with `npm`. Simply import the package depending on your preferred method.

### Via CDN

```javascript
import * as Moonshine from 'https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js'
```

### Via `npm`

Install the package first:

```shell
npm install @usefulsensors/moonshine-js
```

Then import:

```javascript
import * as Moonshine from '@usefulsensors/moonshine-js'
```

## Quickstart

Let's get started with a simple example. We'll create a transcriber to print speech from the microphone to the console. 
We can use the MicrophoneTranscriber for that. You can control the behavior of the transcriber by passing it a set of 
callbacks when you create it:

```javascript
import * as Moonshine from 'https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js'

var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny", // the fastest and smallest Moonshine model
    {
        onTranscriptionUpdated(text) {
            console.log(text)
        }
    }
)

transcriber.start();
```

When we start the transcriber, the browser will request mic permissions and begin printing everything the user says to the console. It is useful in some cases to wait 
until the user has stopped speaking to transcribe their words. In this case, we'll enable voice activity detection (VAD) when we create the transcriber:

```javascript {hl_lines=[8],linenostart=1}
var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny",
    {
        onTranscriptionUpdated(text) {
            console.log(text)
        }
    },
    true // enable voice activity detection
)

transcriber.start();
```

Now the transcription will only update between pauses in speech. 

That's all it takes to get started! Read [the guides](https://moonshinejs.com/docs/guide/) to learn how to transcribe audio from other sources, or to build voice-controlled applications.

## Web Speech Polyfill

Moonshine.js also provides a polyfill for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Usage is as follows:

``` javascript
import * as Moonshine from 'https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js'

var transcriber = new Moonshine.MoonshineSpeechRecognition()

transcriber.addEventListener("result", (e) => {
    console.log("result:", e.results[0][0].transcript);
})
```

## Credit

Moonshine.js is developed and maintained by [Useful Sensors](https://usefulsensors.com).
