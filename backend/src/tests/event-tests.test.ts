import { describe, it, expect, beforeAll, afterAll } from "vitest";

describe("Testing event creation", () => {
    // register user
    let id = "";
    beforeAll(async () => {
        const res = await fetch("http://localhost:3000/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "some dude" }),
        });
        const resJson = await res.json();
        id = resJson.userId;
    });

    it("can create event", async () => {
        const res = await fetch("http://localhost:3000/events/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${id}`,
            },
            body: JSON.stringify({}),
        });
        const resJson = await res.json();
        expect(resJson.id).toBeDefined();
    });
    it.todo(
        "cannot create event event with end date before start date",
        async () => {}
    );
    it.todo("cannot create event without name", async () => {});
    it.todo("cannot create event with same start and end date", async () => {});
    it.todo("can delete event", async () => {});

    // deregister user
    afterAll(async () => {
        const res = await fetch("http://localhost:3000/users/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
    });
});

// describe("Testing event reading", () => {
//     // todo need to register user
//     it.todo("can get event by id", async () => {});
//     it.todo("can get events by user id", async () => {});
//     // todo need to delete user
// });

// describe("Testing event updating", () => {
//     // // todo need to register user
//     // it.todo("can get event by id", async () => {});
//     // it.todo("can get events by user id", async () => {});
//     // // todo need to delete user
// });

// describe("Testing event updating", () => {
//     // // todo need to register user
//     // it.todo("can get event by id", async () => {});
//     // it.todo("can get events by user id", async () => {});
//     // // todo need to delete user
// });
