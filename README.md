# MoonshineJS

MoonshineJS makes it easy for web developers to build modern, speech-driven web experiences without sacrificing user privacy. We build on three key principles:

-   **Fast Transcription**: easily generate real-time speech-to-text from audio streams in the browser.
-   **Easy Voice Control**: build feature-rich voice-controlled web apps in < 10 lines of code.
-   **Local Processing**: all audio processing happens locally in the user's web browser—no cloud services or privacy violations required.

Full documentation is available at [dev.moonshine.ai](https://dev.moonshine.ai/).

_Note: This package is currently in beta, and breaking changes may occur between versions. User feedback and developer contributions are welcome._

## Installation

You can use MoonshineJS via CDN, or you can install it with `npm`. Simply import the package depending on your preferred method.

### Via CDN

```javascript
import * as Moonshine from "https://cdn.jsdelivr.net/npm/@moonshine-ai/moonshine-js@latest/dist/moonshine.min.js";
```

### Via `npm`

Install the package first:

```shell
npm install @moonshine-ai/moonshine-js
```

Then import:

```javascript
import * as Moonshine from "@moonshine-ai/moonshine-js";
```

## Quickstart - Microphone Speech to Text

Let's get started with a simple example. We'll create a transcriber to print speech from the microphone to the console.
We can use the MicrophoneTranscriber for that. You can control the behavior of the transcriber by passing it a set of
callbacks when you create it:

```javascript
import * as Moonshine from "https://cdn.jsdelivr.net/npm/@moonshine-ai/moonshine-js@latest/dist/moonshine.min.js";

var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny", // the fastest and smallest Moonshine model
    {
        onTranscriptionCommitted(text) {
            console.log(text);
        },
    }
);

transcriber.start();
```

When we start the transcriber, the browser will request mic permissions and begin printing everything the user says to the console. By default,
the transcriber uses voice activity detection (VAD) to determine when to transcribe speech. It will wait until long pauses in speech to output a transcript.

MoonshineJS also supports a streaming mode, where the transcript is continually updated as you speak. To do that, we disable VAD mode and add a new 
callback that will continually receive the latest update to the transcript:

```javascript {hl_lines=[7,8,9,10,11],linenostart=1}
var transcriber = new Moonshine.MicrophoneTranscriber(
    "model/tiny",
    {
        onTranscriptionCommitted(text) {
            console.log(`commit: ${text}`)
        }
        onTranscriptionUpdated(text) {
            console.log(`update: ${text}`)
        },
    },
    false // disable VAD for streaming mode
);

transcriber.start();
```

Now the transcription will continually update between pauses in speech, and commit when you stop talking. 

That's all it takes to get started! Read [the guides](https://dev.moonshine.ai/js/guide) to learn how to transcribe audio from other sources, or to build voice-controlled applications.

## Web Speech Polyfill

MoonshineJS also provides a polyfill for the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Usage is as follows:

```javascript
import * as Moonshine from "https://cdn.jsdelivr.net/npm/@moonshine-ai/moonshine-js@latest/dist/moonshine.min.js";

var transcriber = new Moonshine.MoonshineSpeechRecognition();

transcriber.addEventListener("result", (e) => {
    console.log("result:", e.results[0][0].transcript);
});
```

## Building

To build the `dist/moonshine.min.js` file from source, first run `npm install`
and then `npm run build`. You'll need to have the [Moonshine fork of
@ricky0123/vad](https://github.com/moonshine-ai/vad-moonshine) in the parent
folder of this repo, and run `npm install` and `npm build` for the VAD too.

To test that your built version is running correctly, `cd` into
`examples/quickstart`, and in `index.js` comment out the import of moonshine
from npm at the top of the file, then uncomment the local file import. Then run
`npm import` to install [Vite](https://vite.dev/) followed by `npx vite` to
start a static file server hosting the example.

## Credit

MoonshineJS is developed and maintained by [Moonshine AI](https://moonshine.ai).
Our thanks go to [@Ricky0123](https://github.com/ricky0123) for [his excellent
voice activity detector library](https://github.com/ricky0123/vad).

## License

The code in this repo and the English-language Moonshine speech to text model it uses are released under the MIT license. The Spanish-language speech to text model is released under the Moonshine AI Community License for researchers, developers, small businesses, and creators with less than $1M in annual revenue.
