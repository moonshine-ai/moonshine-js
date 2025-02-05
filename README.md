# @usefulsensors/moonshine-js

This package provides quick and easy integration of client-side, on-device speech-to-text on web pages and in web applications with Useful Sensors' [Moonshine](https://github.com/usefulsensors/moonshine) models. It includes the following:

-   🌙 **Rapid UI integration**: add a single `<script>` that automatically adds speech-to-text to all text inputs on a page, or design your own UI integration in a few easy steps.
-   🌙 **Simple client-side speech-to-text primitives**: just import [a single class](https://usefulsensors.github.io/moonshine-js/classes/MicrophoneTranscriber.html) to handle user mic permissions, model loading, and audio transcription, or use our [lower-level implementation](https://usefulsensors.github.io/moonshine-js/classes/StreamTranscriber.html) to easily transcribe audio from any source (e.g., `<audio>` elements, sounds playing in a browser tab, WebRTC connections, etc.).

_Note: This package is currently in beta, and breaking changes may occur between versions. User feedback and developer contributions are welcome._

## Intro

We provide three options for building your application: _auto_, _manual_, and _core_. The "auto" and "manual" options are for users who want to quickly add speech-to-text input to HTML elements on their pages with minimal JavaScript programming. The "core" option is for users who want more in-depth control. It allows you to transcribe audio from any source.

There are a few key modules provided by the `moonshine-js` core library:

-   `StreamTranscriber`: provides transcription of a [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream), allowing you to transcribe audio from many sources.
-   `MicrophoneTranscriber`: handles user mic access, starting/stopping transcription of streaming audio, and transcription generation.
-   `MoonshineModel`: lower-level implementation of transcription generation from input audio (as a [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)) using our ONNX models.

[Read the docs](https://usefulsensors.github.io/moonshine-js/) for more information.

## Installation

You can include `moonshine-js` via CDN, or install it with `npm`.

### Option 1. Include via CDN

#### Auto: Automatically add a speech-to-text button to all input fields.

Include the following `<script>` tag:

```html
<head>
    <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.auto.min.js"
    ></script>
</head>
```

#### Manual: Customize speech-to-text inputs with your own HTML.

Include the following `<script>` tag:

```html
<head>
    <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.manual.min.js"
    ></script>
</head>
```

Now you can specify which text inputs should be speech-enabled and customize their appearance. Add a `data-moonshine-target` attribute to any clickable element that you want to trigger speech-to-text, and set its value to a CSS selector of the element(s) that should be updated with the transcription output. For example:

```html
<textarea id="myTextArea"></textarea>
<button data-moonshine-target="#myTextArea"></button>
```

The manual option also provides options for customizing your layout; [see some examples here](https://github.com/usefulsensors/moonshine-js/blob/main/examples/quickstart/manual.html).

#### Core: Build your own speech-to-text application.

You can also import modules directly from the CDN-hosted core library:

```html
<!DOCTYPE html>
    <head>
        ...
    </head>
    <body>
        ...
        <script type="module">
            import { StreamTranscriber } from "https://cdn.jsdelivr.net/npm/@usefulsensors/moonshine-js@latest/dist/moonshine.min.js"
            var transcriber = new StreamTranscriber(
                {
                    onModelLoadStarted() {
                        console.log("onModelLoadStarted()");
                    },
                    onModelLoaded() {
                        console.log("onModelLoaded()");
                    },
                    onTranscribeStarted() {
                        console.log("onTranscribeStarted()");
                    },
                    onTranscribeStopped() {
                        console.log("onTranscribeStopped()");
                    },
                    onTranscriptionUpdated(text) {
                        console.log(
                            "onTranscriptionUpdated(" + text + ")"
                        );
                    },
                    onTranscriptionCommitted(text) {
                        console.log("onTranscriptionCommitted()");
                    },
                },
                "model/tiny"
            );
            // Get a MediaStream from some source...
            ...

            // Attach the stresam to the transcriber and start transcription
            transcriber.attachStream(mediaStream);
            transcriber.start();
        </script>
    </body>
</html>
```

See a quickstart example [here](https://github.com/usefulsensors/moonshine-js/blob/main/examples/quickstart/core.html).

### Option 2. Install with `npm`

Just run:

```
npm install @usefulsensors/moonshine-js
```

You will need to copy over the `.onnx` model weights and the `.wasm` for the ONNX runtime. By default, `moonshine-js` expects these files to be in a `/dist` folder within your project directory, organized as follows:

```
myApp/
├─ dist/
│  ├─ model/
│  │  ├─ base/
│  │  │  ├─ float/
│  │  │  │  ├─ *.onnx
│  │  ├─ tiny/
│  │  │  ├─ float/
│  │  │  │  ├─ *.onnx
│  ├─ ort-wasm-simd-threaded.jsep.mjs
│  ├─ ort-wasm-simd-threaded.jsep.wasm
├─ node_modules/
├─ package.json
├─ ...
```

Run the following in a bash/zsh terminal in the top level of your project directory to copy everything over:

``` shell
mkdir -p dist
rsync -av --exclude="*.js" node_modules/@usefulsensors/moonshine-js/dist/ dist
```
