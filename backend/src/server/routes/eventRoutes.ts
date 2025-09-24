import { Router, Request, Response } from "express";
import { getPB } from "../../pb";

const eventRoutes = Router();

// Define a route for getting all users
eventRoutes.post("/create", async (req: Request, res: Response) => {
    const body = req.body;
    // const userId = req.body.userId;
    // const username = req.body.name;
    // const startDate = req.body.start;
    // const endDate = req.body.end;
    // const password = req.body.password;
    // get user data
    const pb = await getPB();
    // const userData = await pb!.collection("users").delete(userId);
    // create event
    // return data
    res.status(200).json({});
});

export default eventRoutes;
