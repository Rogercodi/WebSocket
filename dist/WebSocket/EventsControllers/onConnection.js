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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnConnectionWss = void 0;
const simfile_json_1 = __importDefault(require("../../DataFile/simfile.json"));
const calculateIntervals_1 = require("../../helpers/calculateIntervals");
class OnConnectionWss {
    constructor() {
        this.parsedData = { startTime: "", data: [] };
        this.intervals = [];
    }
    connection(ws) {
        return __awaiter(this, void 0, void 0, function* () {
            this.parsedData = simfile_json_1.default;
            this.intervals = (0, calculateIntervals_1.calculateIntervals)();
            let index = 0;
            let flag = false;
            ws.send(JSON.stringify({
                kind: "data",
                data: {
                    time: this.parsedData.data[0].time.split("T")[1].split("+")[0],
                    rpm: this.parsedData.data[0].rpm,
                    gear: this.parsedData.data[0].gear,
                    speed: this.parsedData.data[0].speed,
                },
            }));
            ws.addEventListener("message", (message) => {
                let data = JSON.parse(message.data);
                if (data.command === "play") {
                    flag = true;
                    ws.send(JSON.stringify({
                        kind: "status",
                        data: {
                            status: "play",
                        },
                    }));
                    function delay(obj, time) {
                        return new Promise((resolve, reject) => setTimeout(() => {
                            ws.send(JSON.stringify({
                                kind: "data",
                                data: {
                                    time: obj.time.split("T")[1].split("+")[0],
                                    rpm: obj.rpm,
                                    gear: obj.gear,
                                    speed: obj.speed,
                                },
                            }));
                            resolve();
                        }, time));
                    }
                    (() => __awaiter(this, void 0, void 0, function* () {
                        if (index === this.parsedData.data.length - 3) {
                            console.log('end!');
                            flag = false;
                        }
                        while (flag === true) {
                            if (index === this.parsedData.data.length - 1) {
                                flag = false;
                                ws.send(JSON.stringify({
                                    kind: "status",
                                    data: {
                                        status: "stop",
                                    },
                                }));
                            }
                            try {
                                yield delay(this.parsedData.data[index], this.intervals[index]);
                                index++;
                            }
                            catch (error) {
                                console.error;
                            }
                        }
                    }))();
                }
                if (data.command === "stop") {
                    flag = false;
                    ws.send(JSON.stringify({
                        kind: "status",
                        data: {
                            status: "stop",
                        },
                    }));
                }
                if (data.command === "reset") {
                    flag = false;
                    index = 0;
                    ws.send(JSON.stringify({
                        kind: "data",
                        data: {
                            time: this.parsedData.data[0].time.split("T")[1].split("+")[0],
                            rpm: this.parsedData.data[0].rpm,
                            gear: this.parsedData.data[0].gear,
                            speed: this.parsedData.data[0].speed,
                        },
                    }));
                    ws.send(JSON.stringify({
                        kind: "status",
                        data: {
                            status: "stop",
                        },
                    }));
                }
            });
        });
    }
}
exports.OnConnectionWss = OnConnectionWss;
