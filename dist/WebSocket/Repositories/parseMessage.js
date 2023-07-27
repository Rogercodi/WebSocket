"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedMessage = void 0;
class ParsedMessage {
    constructor() { }
    parseMessage(data) {
        return (JSON.parse(data.toString())).command;
    }
}
exports.ParsedMessage = ParsedMessage;
