import { Settings } from "./constants";

export default class Log {
    static info(text) {
        console.info("[MoonshineJS] " + text)
    }

    static log(text) {
        if (Settings.VERBOSE_LOGGING) {
            console.log("[MoonshineJS] " + text);
        }
    }

    static warn(text) {
        console.warn("[MoonshineJS] " + text);
    }

    static error(text) {
        console.error("[MoonshineJS] " + text);
    }
}
