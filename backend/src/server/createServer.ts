import express from "express";
import cors from "cors";
import { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import { getPB } from "../pb";
import { dateToString, getDateTwoWeeksLater } from "../utilities";
import jwt from "jsonwebtoken";
import config from "../dotenv";

export function errorHandlingMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    res.status(500).json({ message: "Encountered Error" });
}
const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const eventId = req.params.eventId;
    const pb = await getPB();
    const record = await pb!.collection("events").getOne(eventId, {});
    let activeTokenRecord: any = null;
    try {
        activeTokenRecord = await pb!
            .collection("active_tokens")
            .getFirstListItem(`event_id = "${eventId}"`, {});
    } catch (e) {
        console.log(
            "failed to get active token record; Probably does not exist"
        );
    }
    // check if there is an active token to check against
    if (activeTokenRecord == null) {
        next(); // let it pass through as its unprotected
    } else {
        // get the auth token
        const incomingToken = req.headers.authorization!.split(" ")[1];
        try {
            // attempt to decode jwt
            const decoded = jwt.verify(incomingToken, config.secret);
            // check if is active token
            const isActive = incomingToken == activeTokenRecord.token;
            if (isActive == false) {
                throw "Token is inactive";
            }
            next(); // let it go throguuh, verification success
        } catch (e) {
            res.status(403).json({ error: "token verification failed" });
        }
    }
};
export default function createServer() {
    // create app
    const expressApp = express();
    // handle middleware
    expressApp.use(bodyParser.json());
    const allowedOrigins = [
        "http://chippy:3012",
        "http://localhost:5173",
        "https://sowhen.app",
        "https://www.sowhen.app",
    ];
    expressApp.use(
        cors({
            origin: function (origin, callback) {
                if (!origin) return callback(null, true);
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg =
                        "The CORS policy for this site does not allow access from the specified Origin.";
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            },
        })
    );
    // * --- --- --- --- protected routes
    expressApp.get("/getEvent/:eventId", authMiddleware, async (req, res) => {
        // get param
        const eventId = req.params.eventId;
        // get data from db
        const pb = await getPB();
        const record = await pb!.collection("events").getOne(eventId, {});
        res.status(200).json(record);
    });
    expressApp.post(
        "/updateEvent/:eventId",
        authMiddleware,
        async (req, res) => {
            const pb = await getPB();
            // * --- --- handle a change in password
            // check prev password
            const prev = await pb!.collection("events").getOne(req.body.id, {});
            const changedPassword =
                prev.event_password != req.body.eventPassword;
            if (changedPassword) {
                // on password change:  delete previous record if it exists
                try {
                    const record = await pb!
                        .collection("active_tokens")
                        .getFirstListItem(`event_id = "${req.body.id}"`, {});
                    await pb!.collection("active_tokens").delete(record.id);
                } catch (e) {
                    console.log(
                        "failed to delete active token. most like token doesnt exist"
                    );
                }
                // if new password is not blank... then create a new active token and save it
                if (req.body.eventPassword != "") {
                    const accessToken = jwt.sign(
                        { eventId: req.body.event_id, timestamp: Date.now() },
                        config.secret
                    );
                    const data = {
                        token: accessToken,
                        event_id: req.body.id,
                    };
                    const record = await pb!
                        .collection("active_tokens")
                        .create(data);
                }
            }
            // * --- --- handle the actual update
            // construct a new data
            const data = {
                event_name: req.body.eventName,
                start_date: req.body.startDate,
                end_date: req.body.endDate,
                event_password: req.body.eventPassword,
                guests: req.body.guests,
            };
            // write the new data
            const record = await pb!
                .collection("events")
                .update(req.body.id, data);
            // respond to json
            res.status(200).json({
                message: `updated event: ${record.id}`,
            });
        }
    );
    // * --- --- --- --- public routes
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
    expressApp.post("/verifyPassword", async (req, res) => {
        const password = req.body.password;
        const eventId = req.body.eventId;
        // get record
        const pb = await getPB();
        const record = await pb!.collection("events").getOne(eventId);
        // test match
        const match = password === record.event_password;
        if (match) {
            // if jwt exists in db else create it
            const activeTokenRecord = await pb!
                .collection("active_tokens")
                .getFirstListItem(`event_id = "${req.body.eventId}"`, {});
            // return it
            res.status(200).json({
                message: "password checks out",
                token: activeTokenRecord.token,
            });
        } else {
            // return 403 with error
            res.status(403).json({ error: "password verification failed" });
        }
        // respond
    });
    // handle error middle wares
    expressApp.use(errorHandlingMiddleware);
    // return app
    return expressApp;
}
