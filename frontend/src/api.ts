import { EventData } from "./routes/EventRoute/EventRoute";

export default class API {
    static url = "http://localhost:3000";
    static async getEventdata(eventId: string) {
        const res = await fetch(`${API.url}/getEvent/${eventId}`);
        return await res.json();
    }
    static async updateEventDate(data: EventData) {}
}
