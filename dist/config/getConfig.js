"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = void 0;
require('dotenv').config();
class getConfiguration {
    constructor() { }
    ;
    getEnvVar() {
        let envVar = {
            port: parseInt(process.env.PORT),
            frontDir: process.env.PUBLIC_DIR,
            fileDir: process.env.SIMFILE_DIR
        };
        return envVar;
    }
}
exports.getConfiguration = getConfiguration;
