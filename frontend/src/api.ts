export default class API {
    static url = "http://localhost:3000";
    static async getEventdata(eventId: string) {
        const res = await fetch(`${API.url}/getEvent/${eventId}`);
        return await res.json();
    }
    static async updateEventDate(data: Object) {
        const res = await fetch(`${API.url}/updateEvent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
    static async createNewEvent() {
        const res = await fetch(`${API.url}/createEvent`);
        return await res.json();
    }
    static async getEventName(eventId: string) {
        const res = await fetch(`${API.url}/getEventName/${eventId}`);
        const resJson = await res.json();
        return await resJson.name;
    }
}
