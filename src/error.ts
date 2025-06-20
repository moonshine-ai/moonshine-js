/**
 * Errors that can occur during usage of MoonshineJS, along with a descriptive message.
 * 
 * These are passed to the onError {@link TranscriberCallbacks} when an error occurs so that the developer
 * can implement error handling as necessary for their application. 
 * @enum
 */
export const MoonshineError = {
    PermissionDenied: "Permission to the requested resource was denied.",
    PlatformUnsupported: "This platform (e.g., user browser or device) is not supported.",
    NotReceivingAudioInput: "The audio system is not receiving input from the source."
}

export default MoonshineError;