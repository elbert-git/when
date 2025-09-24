import express from "express";
import { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import Auth from "../auth";
import userRoutes from "./routes/usersRoutes";

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

    // create public routes
    expressApp.post("/registerUser", async (req, res) => {
        // get params
        const userName = req.body.username;
        // register with auth
        const id = await Auth.register(userName);
        // respond with user id
        res.status(200).json({ userId: id });
    });

    // import in other routes
    expressApp.use("/users", userRoutes);

    // handle error middle wares
    expressApp.use(errorHandlingMiddleware);

    // return app
    return expressApp;
}
