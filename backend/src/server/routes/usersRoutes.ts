import { Router, Request, Response } from "express";
import { getPB } from "../../pb";

const userRoutes = Router();

// Define a route for getting all users
userRoutes.post("/delete", async (req: Request, res: Response) => {
    const id = req.body.id;
    // check if id exists
    try {
        const pb = await getPB();
        await pb!.collection("users").delete(id);
        res.status(200).json({ message: `deleted user id: ${id}` });
    } catch (e) {
        res.status(500).json({
            error: "something went wrong, id might not exist",
        });
    }
});

export default userRoutes;
