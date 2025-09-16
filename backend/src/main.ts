import createServer from "./server/createServer";
import { getPB } from "./pb";

// start database
const pb = getPB();

// create server
const server = createServer();

// start the server
server.listen(3000, () => {
    console.log("server started");

    (async () => {
        console.log("start fetch");
        const res = await fetch("http://localhost:3000/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "some dude" }),
        });
        console.log(await res.json());
    })();
});
