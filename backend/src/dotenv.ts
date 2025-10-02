import * as dotenv from "dotenv";

const load = dotenv.config();
const parsed = load.parsed;
const configs = {
    pocketBaseUrl: process.env.POCKETBASE_URL as string,
    pocketBaseEmail: process.env.POCKETBASE_ADMIN_EMAIL as string,
    pocketBasePassword: process.env.POCKETBASE_ADMIN_PASSWORD as string,
    secret: process.env.SECRET as string,
};

export default configs;
