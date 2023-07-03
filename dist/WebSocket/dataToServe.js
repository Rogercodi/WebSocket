"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataToServe = void 0;
const simfile_json_1 = __importDefault(require("../DataFile/simfile.json"));
class DataToServe {
    constructor() {
        this.data = simfile_json_1.default.data;
        this.intervalics = this.getIntervals();
        console.log(this.intervalics);
    }
    getIntervals() {
        //Transform time stamps to ms
        let getMili = [];
        simfile_json_1.default.data.map((mark) => {
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
exports.DataToServe = DataToServe;
