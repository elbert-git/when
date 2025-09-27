import express from "express";
import cors from "cors";
import { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import Auth from "../auth";
import userRoutes from "./routes/usersRoutes";
import { getPB } from "../pb";

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
    // handle error middle wares
    expressApp.use(errorHandlingMiddleware);
    // return app
    return expressApp;
}
