import { getPB } from "./pb";
import PocketBase from "pocketbase";

export default class Auth {
    static async register(username: string) {
        // get pb
        const pb = (await getPB()) as PocketBase;
        // example create data
        const data = {
            username: username,
        };
        const record = await pb.collection("users").create(data);
        const id = record.id;
        return id;
    }
}
