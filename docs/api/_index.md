undefined
## Classes

| Class | Description |
| ------ | ------ |
| [IntentClassifier](/docs/api/classes/IntentClassifier) | Implements voice control using intent classification. |
| [KeywordSpotter](/docs/api/classes/KeywordSpotter) | Implements voice control using basic keyword spotting. |
| [MicrophoneTranscriber](/docs/api/classes/MicrophoneTranscriber) | Accesses the user's microphone and generates transcriptions using an underlying [StreamTranscriber](/docs/api/classes/StreamTranscriber.md). |
| [MoonshineModel](/docs/api/classes/MoonshineModel) | Implements speech-to-text inferences with Moonshine models. |
| [StreamTranscriber](/docs/api/classes/StreamTranscriber) | Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object. |
| [VoiceController](/docs/api/classes/VoiceController) | An interface for invoking voice-controlled actions on a page using speech transcribed by a Transcriber. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TranscriberCallbacks](/docs/api/interfaces/TranscriberCallbacks) | Callbacks that are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream. |

## Variables

| Variable | Description |
| ------ | ------ |
| [MoonshineSettings](/docs/api/variables/MoonshineSettings) | Global speech-to-text settings. |

