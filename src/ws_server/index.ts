import { WebSocketServer, WebSocket } from "ws";

export const webSocketServer = (port: number) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws: WebSocket) => {
    console.log(`Websocket server started on ${port} port`);

    ws.on("message", function message(data) {
      console.log("received: %s", data);
    });

    ws.send(`Websocket_server_started_on_${port}_port`);
  });
};

// import WebSocket, { createWebSocketStream } from 'ws';

// const ws = new WebSocket('wss://websocket-echo.com/');

// const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

// duplex.pipe(process.stdout);
// process.stdin.pipe(duplex);
