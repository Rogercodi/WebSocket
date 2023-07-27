"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFromFile = void 0;
const path_1 = __importDefault(require("path"));
const getConfig_1 = require("../../config/getConfig");
class DataFromFile {
    constructor() {
        this.data = this.getData();
        this.intervalics = this.getIntervals();
    }
    getData() {
        const fileDir = new getConfig_1.getConfiguration().getEnvVar().fileDir;
        console.log(path_1.default.join(__dirname + fileDir));
        const jsonFile = require(path_1.default.join(__dirname + fileDir));
        return jsonFile.data;
    }
    getIntervals() {
        //Transform time stamps to ms
        let getMili = [];
        this.data.map((mark) => {
            getMili.push(new Date(mark.time).getTime());
        });
        //Time Interval between stamps
        const dataInterval = [0];
        for (let x = 0; x < getMili.length - 1; x++) {
            let interval = getMili[x + 1] - getMili[x];
            dataInterval.push(interval);
        }
        return dataInterval;
    }
}
exports.DataFromFile = DataFromFile;
