interface KeychainCache {
    [index: string]: string;
}
export default class Keychain {
    static key = "when-local-key";
    static cache: KeychainCache = {};
    static init() {
        // load
        const raw = localStorage.getItem(Keychain.key);
        if (raw === "" || raw == undefined || raw == null) {
            // empty local storage
            // create one
            Keychain.cache = {};
            // save cache
            Keychain.writeCache();
        }
    }
    static registerToken(eventId: string, token: string) {
        Keychain.cache[eventId] = token;
        Keychain.writeCache();
    }
    static getToken(eventId: string) {
        if (Object.keys(Keychain.cache).includes(eventId)) {
            return Keychain.cache[eventId];
        } else {
            return null;
        }
    }
    static writeCache() {
        console.log("writing cache", Keychain.cache);
        const jsonString = JSON.stringify(Keychain.cache);
        localStorage.setItem(Keychain.key, jsonString);
    }
}
