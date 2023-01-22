import { WebSocketServer, WebSocket, createWebSocketStream } from "ws";
import { parser } from "./utiles";
import { controller } from "./controller";
// import { controller } from "./services";
import { ReturningData } from "./services";
import { Point } from "@nut-tree/nut-js";

export const webSocketServer = (port: number) => {
  const wsServer = new WebSocketServer({ port });

  wsServer.on("connection", (ws: WebSocket) => {
    console.log(`Websocket server started on ${port} port`);

    const duplex = createWebSocketStream(ws, { decodeStrings: false });

    // duplex.on("data", async (data: Buffer) => {
    //   try {
    //     console.log("Command from client:", data.toString());

    //     // const res = await controller(data.toString());

    //     // const base64 = "TEST";
    //     // duplex.write(`prnt_scrn ${base64}`);
    //     console.log(data.toString());
    //     duplex.write(`${data} 100,200`);
    //   } catch (error) {
    //     if (typeof error === "string") {
    //       console.log(error);
    //       duplex.write(error);
    //     } else {
    //       console.log(`Error`);
    //       duplex.write("Error");
    //     }
    //   }
    // });

    ws.on("message", function message(data) {
      console.log("received: %s", data);

      const [methods, params] = parser(data.toString());
      const subCommand = methods[1];
      const returningData = new ReturningData();

      returningData.on(`${subCommand}`, async (arg) => {
        const mousePosition: Point = await arg;
        duplex.write(`${data} ${mousePosition.x},${mousePosition.y}`);
      });

      returningData.getData();

      controller(methods, params);

      if (subCommand !== "position") {
        duplex.write(`${data}`);
      }
    });

    ws.send("Connected");
    // ws.send(`Websocket_server_started_on_${port}_port`);
  });

  wsServer.on("close", () => console.log("CLOSE"));
  // const wss = new WebSocketStream(WSS_URL);

  // duplex.pipe(process.stdout);
  // process.stdin.pipe(duplex);
};

// import WebSocket, { createWebSocketStream } from 'ws';

// const ws = new WebSocket('wss://websocket-echo.com/');

// const duplex = createWebSocketStream(wss, { encoding: 'utf8' });

// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);

// import { createWriteStream } from "fs";
// const write = async () => {
//   const path = __dirname + "/files/fileToWrite.txt";
//   const writeStream = createWriteStream(path);

//   console.log("Type in something:");

//   process.stdin.on("data", (data) => {
//     writeStream.write(data.toString());
//     process.exit();
//   });
// };

// import { Transform } from "stream";

// const transform = async () => {
//   const reverseString = new Transform({
//     transform(chunk, encoding, callback) {
//       callback(null, chunk.toString().split("").reverse().join(""));
//     },
//   });

//   console.log("Give me your string:");

//   process.stdin.pipe(reverseString).pipe(process.stdout);
// };

// await transform();

// const readableStream = new stream.Readable({
//   read() {
//     console.log("RS");
//   },
// });

// ws.on("message", (data) => {
//   console.log("RS on MESS");
//   readableStream.push(data);
// });

// readableStream.pipe(process.stdout);
