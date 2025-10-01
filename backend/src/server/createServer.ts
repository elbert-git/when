import express from "express";
import cors from "cors";
import { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import Auth from "../auth";
import userRoutes from "./routes/usersRoutes";
import { getPB } from "../pb";
import { dateToString, getDateTwoWeeksLater } from "../utilities";

export function errorHandlingMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    res.status(500).json({ message: "Encountered Error" });
}

export default function createServer() {
    // create app
    const expressApp = express();
    // handle middleware
    expressApp.use(bodyParser.json());
    expressApp.use(cors());
    // * --- get event
    expressApp.get("/getEvent/:eventId", async (req, res) => {
        // get param
        const eventId = req.params.eventId;
        // get data from db
        const pb = await getPB();
        const record = await pb!.collection("events").getOne(eventId, {});
        res.status(200).json(record);
    });
    expressApp.post("/updateEvent", async (req, res) => {
        console.log(req.body);
        const pb = await getPB();
        const data = {
            event_name: req.body.eventName,
            start_date: req.body.startData,
            end_date: req.body.endDate,
            event_password: req.body.eventPassword,
            guests: req.body.guests,
        };

        const record = await pb!.collection("events").update(req.body.id, data);
        res.status(200).json({
            message: `updated event: ${record.id}`,
        });
    });
    expressApp.get("/createEvent", async (req, res) => {
        const pb = await getPB();
        const data = {
            event_name: "a casual bite",
            start_date: dateToString(new Date()),
            end_date: dateToString(getDateTwoWeeksLater()),
            guests: { all: [] },
            event_password: "",
        };
        const record = await pb!.collection("events").create(data);
        res.status(200).json({
            message: `successfully created event ${record.id}`,
            newId: record.id,
        });
    });
    expressApp.get("/getEventName/:eventId", async (req, res) => {
        // get param
        const eventId = req.params.eventId;
        // get data from db
        const pb = await getPB();
        const record = await pb!.collection("events").getOne(eventId, {});
        res.status(200).json({ name: record.event_name });
    });
    // handle error middle wares
    expressApp.use(errorHandlingMiddleware);
    // return app
    return expressApp;
}
