import { Settings } from "./constants";

export default class Log {
    static info(text) {
        console.info("[Moonshine.js] " + text)
    }

    static log(text) {
        if (Settings.VERBOSE_LOGGING) {
            console.log("[Moonshine.js] " + text);
        }
    }

    static warn(text) {
        console.warn("[Moonshine.js] " + text);
    }

    static error(text) {
        console.error("[Moonshine.js] " + text);
    }
}
