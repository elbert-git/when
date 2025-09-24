import { describe, it, expect } from "vitest";

describe("Testing user registeration", () => {
    let id = "";
    it("can send register request", async () => {
        const res = await fetch("http://localhost:3000/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "some dude" }),
        });
        const resJson = await res.json();
        expect(resJson.userId).toBeDefined();
        id = resJson.userId;
    });
    it("cannot delete user that does not exist", async () => {
        const res = await fetch("http://localhost:3000/users/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "random" }),
        });
        const resJson = await res.json();
        expect(res.status).not.toBe(200);
    });

    it("can delete user", async () => {
        const res = await fetch("http://localhost:3000/users/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        const resJson = await res.json();
        expect(res.status).toBe(200);
    });
});
