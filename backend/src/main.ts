import createServer from "./server/createServer";
import { getPB } from "./pb";

// start database
const pb = getPB();

// create server
const server = createServer();

// start the server
server.listen(3000, () => {
    console.log("server started");
});
