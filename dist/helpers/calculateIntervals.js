"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateIntervals = void 0;
const simfile_json_1 = __importDefault(require("../DataFile/simfile.json"));
function calculateIntervals() {
    //Transform time stamps to ms
    const getMili = [];
    simfile_json_1.default.data.map((mark) => {
        getMili.push(new Date(mark.time).getTime());
    });
    //Time Interval between stamps
    const dataInterval = [0, 11];
    for (let x = 0; x < getMili.length - 1; x++) {
        let interval = getMili[x + 1] - getMili[x];
        dataInterval.push(interval);
    }
    return dataInterval;
}
exports.calculateIntervals = calculateIntervals;
