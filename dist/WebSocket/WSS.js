"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketServer = void 0;
const ws_1 = require("ws");
const API_1 = require("../API");
const customWebSocket_1 = require("./Service/customWebSocket");
;
const dataFromFile_1 = require("./Repositories/dataFromFile");
const dataToSend_1 = require("./Repositories/dataToSend");
class webSocketServer {
    constructor() {
        this.API = new API_1.API();
        this.wss = new ws_1.WebSocketServer({ server: this.API.http });
        this.data = new dataFromFile_1.DataFromFile().data;
        this.intervals = new dataFromFile_1.DataFromFile().intervalics;
        this.connection();
    }
    ;
    init(port) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.API.listen(port, '0.0.0.0');
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    ;
    connection() {
        this.wss.on('connection', (ws) => {
            new customWebSocket_1.CustomWebSocket(ws, this.data, this.intervals);
            ws.send(JSON.stringify(new dataToSend_1.DataToSend().sendData('data', this.data[0])));
        });
    }
    ;
}
exports.webSocketServer = webSocketServer;
;
