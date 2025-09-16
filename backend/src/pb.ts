import PocketBase, { BaseAuthStore } from "pocketbase";
import configs from "./dotenv";

let initialised = false;
let pocketBase: PocketBase | null = null;

async function initiatePocketBase() {
    // get database
    console.log(`connecting to pb url: ${configs.pocketBaseUrl}`);
    const pb = new PocketBase(configs.pocketBaseUrl);
    // authenticate session
    await pb
        .collection("database_users")
        .authWithPassword(configs.pocketBaseEmail, configs.pocketBasePassword);
    // set pb
    pocketBase = pb as PocketBase;
}

export async function getPB() {
    if (initialised) {
        return pocketBase;
    } else {
        await initiatePocketBase();
        return pocketBase;
    }
}
