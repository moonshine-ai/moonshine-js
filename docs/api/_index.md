undefined
## Classes

| Class | Description |
| ------ | ------ |
| [IntentClassifier](/docs/api/classes/intentclassifier) | Implements voice control using intent classification. |
| [KeywordSpotter](/docs/api/classes/keywordspotter) | Implements voice control using basic keyword spotting. |
| [MicrophoneTranscriber](/docs/api/classes/microphonetranscriber) | Accesses the user's microphone and generates transcriptions using an underlying [StreamTranscriber](/docs/api/classes/streamtranscriber). |
| [MoonshineModel](/docs/api/classes/moonshinemodel) | Implements speech-to-text inferences with Moonshine models. |
| [StreamTranscriber](/docs/api/classes/streamtranscriber) | Implements real-time transcription of an audio stream sourced from a WebAudio-compliant MediaStream object. |
| [VoiceController](/docs/api/classes/voicecontroller) | An interface for invoking voice-controlled actions on a page using speech transcribed by a Transcriber. |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [TranscriberCallbacks](/docs/api/interfaces/transcribercallbacks) | Callbacks that are invoked at different phases of the lifecycle as audio is transcribed. You can control the behavior of the application in response to model loading, starting of transcription, stopping of transcription, and updates to the transcription of the audio stream. |

## Variables

| Variable | Description |
| ------ | ------ |
| [MoonshineSettings](/docs/api/variables/moonshinesettings) | Global speech-to-text settings. |

