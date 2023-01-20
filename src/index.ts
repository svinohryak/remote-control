import { httpServer } from "./http_server/index";
import { webSocketServer } from "./ws_server/index";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

webSocketServer(WS_PORT);
