# @moonshine-ai/moonshine-js

## Enumerations

| Enumeration | Description |
| ------ | ------ |
| [MoonshineError](/docs/enumerations/MoonshineError.md) | Errors that can occur during usage of MoonshineJS, along with a descriptive message. |

## Classes

| Class | Description |
| ------ | ------ |
| [IntentClassifier](/docs/classes/IntentClassifier.md) | Implements voice control using intent classification. |
| [KeywordSpotter](/docs/classes/KeywordSpotter.md) | Implements voice control using basic keyword spotting. |
| [MediaElementTranscriber](/docs/classes/MediaElementTranscriber.md) | Transcribes the output of an `<audio>` or `<video>` HTML element. |
| [MicrophoneTranscriber](/docs/classes/MicrophoneTranscriber.md) | Accesses the user's microphone and transcribes their speech. |
| [MoonshineModel](/docs/classes/MoonshineModel.md) | Implements speech-to-text inferences with Moonshine models. |
| [MoonshineSpeechRecognition](/docs/classes/MoonshineSpeechRecognition.md) | - |
| [Transcriber](/docs/classes/Transcriber.md) | Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object. |
| [VideoCaptioner](/docs/classes/VideoCaptioner.md) | Transcribes a <video> element, rendering the results as captions on the video. |
| [VoiceController](/docs/classes/VoiceController.md) | An interface for invoking voice-controlled actions on a page using speech transcribed by a [Transcriber](/docs/classes/Transcriber.md). |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TranscriberCallbacks](/docs/interfaces/TranscriberCallbacks.md) | Callbacks are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream. |

## Variables

| Variable | Description |
| ------ | ------ |
| [Settings](/docs/variables/Settings.md) | Global settings for MoonshineJS. |
