"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessageWs = void 0;
class onMessageWs {
    constructor() { }
    onMessage(wssMessage) {
        const message = JSON.parse(wssMessage.toString());
        console.log(message);
    }
}
exports.onMessageWs = onMessageWs;
