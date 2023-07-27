"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWebSocket = void 0;
const uuid_1 = require("uuid");
const parseMessage_1 = require("../Repositories/parseMessage");
const webSocketMethods_1 = require("./webSocketMethods");
class CustomWebSocket {
    constructor(ws, data, intervals) {
        this.ws = ws;
        this.id = (0, uuid_1.v4)();
        this.index = 0;
        this.flag = false;
        this.data = data;
        this.intervals = intervals;
        this.getMessage();
    }
    getUser() {
        return this;
    }
    getMessage() {
        this.ws.on("message", (message) => {
            const parsedMessage = new parseMessage_1.ParsedMessage().parseMessage(message);
            let parsedData = ["play", "stop", "reset"];
            if (parsedData.indexOf(parsedMessage) > -1) {
                let user = this.getUser();
                new webSocketMethods_1.WebSocketMethods(parsedMessage, user);
            }
            else {
                throw new Error();
            }
        });
    }
}
exports.CustomWebSocket = CustomWebSocket;
