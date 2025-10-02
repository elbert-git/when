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
        } catch {
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
        const jsonString = JSON.stringify(Keychain.cache);
        localStorage.setItem(Keychain.key, jsonString);
    }
}
