interface KeychainCache {
    [index: string]: string;
}
export default class Keychain {
    static key = "when-local-key";
    static cache: KeychainCache = {};
    static init() {
        const raw = localStorage.getItem(Keychain.key);
        try {
            Keychain.cache = JSON.parse(raw as string);
        } catch (e) {
            console.log("failed to load local storage", e);
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
        try {
            return Keychain.cache[eventId];
        } catch (e) {
            console.log("failed to get key from keychain", e);
            return null;
        }
    }
    static writeCache() {
        const jsonString = JSON.stringify(Keychain.cache);
        localStorage.setItem(Keychain.key, jsonString);
    }
}
