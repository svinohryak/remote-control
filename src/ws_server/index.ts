import { WebSocketServer, WebSocket, createWebSocketStream } from "ws";
import { parser } from "./utiles";
import { controller } from "./controller";
import { ReturningData } from "./services";
import { Point } from "@nut-tree/nut-js";
import { httpServer } from "../http_server";

export const webSocketServer = (port: number) => {
  const wsServer = new WebSocketServer({ port });

  wsServer.on("connection", (ws: WebSocket) => {
    console.log(`Websocket server started on ${port} port`);

    const duplex = createWebSocketStream(ws, { decodeStrings: false });
    duplex.write("Connected");

    ws.on("message", function message(data) {
      console.log("received command: %s", data);

      const [methods, params] = parser(data.toString());
      const subCommand = methods[1];
      const returningData = new ReturningData();

      returningData.on(`position`, async (arg) => {
        const mousePosition: Point = await arg;
        duplex.write(`${data} ${mousePosition.x},${mousePosition.y}`);
      });

      returningData.on(`scrn`, async (arg) => {
        const image64 = await arg;
        duplex.write(`${data} ${image64}`);
      });

      if (subCommand === "position") {
        returningData.getData();
      }
      if (subCommand === "scrn") {
        returningData.getScrnshot();
      }

      controller(methods, params);

      if (subCommand !== "position" && subCommand !== "scrn") {
        duplex.write(`${data}`);
      }
    });

    ws.on("close", () => {
      console.log("Socket was closed");
    });

    ws.on("error", () => {
      console.log("Socket error");
    });
  });

  wsServer.on("close", () => console.log("Disconnected"));

  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
    process.on(signal, () => {
      console.log("\r\n Servers and process were closed");
      wsServer.close();
      httpServer.close();
      process.exit();
    })
  );
};
