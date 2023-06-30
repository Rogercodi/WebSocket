"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketServer = void 0;
const ws_1 = require("ws");
const API_1 = require("./API");
const onMessage_1 = require("./onMessage");
class webSocketServer {
    //   public ws: WebSocket;
    constructor() {
        this.API = new API_1.API();
        this.wss = new ws_1.WebSocketServer({ server: this.API.http });
        // this.ws = new WebSocket("ws://0.0.0.0:3000");
        this.wss.on("connection", (ws) => {
            ws.on('message', new onMessage_1.onMessageWs().onMessage),
                ws.on('error', console.error);
        });
    }
}
exports.webSocketServer = webSocketServer;
