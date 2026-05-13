import { io, Socket } from "socket.io-client";
import Keychain from "./keychain";

export class SocketConnection {
    url;
    socket: Socket;
    constructor(url: string, eventId: string, authToken?: string) {
        // connect
        this.url = url;
        this.socket = io(this.url, {
            auth: { token: authToken },
            query: { eventId },
        });
        this.socket.on("connect", () => {
            const connectEvent = new CustomEvent("websocket_connected");
            window.dispatchEvent(connectEvent);
        });
        this.socket.on("disconnect", () => {
            const disconnectEvent = new CustomEvent("websocket_disconnected");
            window.dispatchEvent(disconnectEvent);
        });
        this.socket.on("message", (payload) => {
            console.log("received message", payload);
        });
        this.socket.on("updateAvailabilites", (payload) => {
            const event = new CustomEvent("updateAvailabilites", {
                detail: payload,
            });
            window.dispatchEvent(event);
        });
    }
    disconnect() {
        this.socket.disconnect();
    }
    broadcastUpdateAvailabilities(
        memberIndex: number,
        timeslot: string,
        add: boolean,
    ) {
        this.socket.emit("updateAvailabilites", { memberIndex, timeslot, add });
    }
}

export default class API {
    static url = "https://api.sowhen.app";
    // static url = "http://localhost:3000";
    static async getEventdata(eventId: string) {
        const res = await fetch(`${API.url}/getEvent/${eventId}`, {
            headers: {
                Authorization: `Bearer ${Keychain.getToken(eventId)}`,
            },
        });
        if (res.status === 403) {
            throw "forbidden error";
        }
        return await res.json();
    }
    static async updateEventDate(data: any) {
        await fetch(`${API.url}/updateEvent/${data.id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Keychain.getToken(data.id)}`,
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
    static async verifyPassword(eventId: string, password: string) {
        console.log("start password verification");
        const res = await fetch(`${API.url}/verifyPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                eventId,
                password,
            }),
        });
        const resJson = await res.json();
        if (res.status === 200) {
            Keychain.registerToken(eventId, resJson.token);
        }
        return res.status === 200;
    }
}
