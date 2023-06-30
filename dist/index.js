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
const WSS_1 = require("./WebSocket/WSS");
const getConfig_1 = require("./config/getConfig");
const { fileDir, frontDir, port } = new getConfig_1.getConfiguration().getEnvVar();
const checkEnvVar = (fileDir, frontDir, port) => {
    return fileDir && frontDir && port;
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkEnvVar(fileDir, frontDir, port)) {
        throw new Error('Missing Env Variables');
    }
    else {
        yield new WSS_1.webSocketServer().init(port);
    }
});
main().catch((e) => {
    console.log(e);
});
