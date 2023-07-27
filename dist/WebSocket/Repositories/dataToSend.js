"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataToSend = void 0;
class DataToSend {
    sendData(kind, data) {
        let result = {
            kind,
            data: {
                time: data.time.split("T")[1].split("+")[0],
                rpm: data.rpm,
                gear: data.gear,
                speed: data.speed,
            },
        };
        return result;
    }
    sendStatus(kind, status) {
        let result = {
            kind,
            data: {
                status,
            },
        };
        return result;
    }
}
exports.DataToSend = DataToSend;
