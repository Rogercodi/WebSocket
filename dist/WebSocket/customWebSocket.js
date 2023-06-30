"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomWebSocket = void 0;
const uuid_1 = require("uuid");
const parseMessage_1 = require("./parseMessage");
;
class CustomWebSocket {
    constructor(ws) {
        this.ws = ws,
            this.id = (0, uuid_1.v4)();
        this.index = 0;
        this.flag = false;
        this.getMessage();
    }
    getUser() {
        return this;
    }
    ;
    getMessage() {
        this.ws.on('message', (message) => {
            const parsedMessage = new parseMessage_1.ParsedMessage().parseMessage(message);
            let parsedData = ['play', 'stop', 'reset'];
            if (parsedData.indexOf(parsedMessage)) {
                console.log('checked!');
            }
            else {
                throw new Error;
            }
        });
    }
}
exports.CustomWebSocket = CustomWebSocket;
;
