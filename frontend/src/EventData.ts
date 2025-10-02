import API from "./api";

export enum Dayslot {
    morning,
    afternoon,
    night,
}

export interface Availability {
    date: string;
    slot: Dayslot;
}

export interface Guest {
    name: string;
    availabilities: Array<Availability>;
}

// purely temporary
export const tempData: object = {
    id: "asdff",
    eventName: "Some Long Event Name",
    startDate: "2025/09/01",
    endDate: "2025/12/04",
    guests: {
        all: [
            { name: "alex", availabilities: [] },
            { name: "baxter", availabilities: [] },
            { name: "charlie", availabilities: [] },
            { name: "denny", availabilities: [] },
        ],
    },
};

export default class EventData {
    id: string;
    eventName: string;
    eventPassword: string;
    startDate: string;
    endDate: string;
    guests: { all: Array<Guest> };
    constructor(apiResponseObject: { [index: string]: any }) {
        this.id = apiResponseObject["id"];
        this.eventName = apiResponseObject["event_name"];
        this.startDate = apiResponseObject["start_date"];
        this.endDate = apiResponseObject["end_date"];
        this.eventPassword = apiResponseObject["event_password"];
        this.guests = apiResponseObject["guests"];
    }
    static async pullFromApi(id: string) {
        try {
            const res = await API.getEventdata(id);
            const data = new EventData(res);
            return data;
        } catch (e) {
            console.log("event data pull failed, most likely forbidden");
            console.log(e);
            return false;
        }
    }
    static ingestFromObject(o: { [index: string]: any }) {
        const data = new EventData(o);
        return data as EventData;
    }
    async writeToDatabase() {
        await API.updateEventDate(this.toJson());
    }
    toJson() {
        return {
            eventName: this.eventName,
            eventPassword: this.eventPassword,
            startDate: this.startDate,
            endDate: this.endDate,
            guests: this.guests,
            id: this.id,
        };
    }
}
