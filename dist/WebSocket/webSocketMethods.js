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
exports.WebSocketMethods = void 0;
class WebSocketMethods {
    constructor(parsedMessage, user) {
        this.message = parsedMessage;
        this.user = user;
        this.data = user.data;
        this.checkMethod();
    }
    checkMethod() {
        switch (this.message) {
            case 'play':
                console.log('play');
                this.user.flag = true;
                this.play();
                break;
            case 'stop':
                this.stop();
                break;
            case 'reset':
                console.log('reset');
                this.reset();
        }
    }
    play() {
        function delay(obj, time, ws) {
            return new Promise((resolve, reject) => setTimeout(() => {
                //Error handling
                ws.send(JSON.stringify({
                    "kind": "data",
                    "data": {
                        "time": obj.time.split('T')[1].split('+')[0],
                        "rpm": obj.rpm,
                        "gear": obj.gear,
                        "speed": obj.speed
                    }
                }));
                resolve();
            }, time));
        }
        (() => __awaiter(this, void 0, void 0, function* () {
            // if(this.user.index === this.user.intervals.length - 1){
            //   flag = false
            // }
            while (this.user.flag) {
                try {
                    yield delay(this.user.data[this.user.index], this.user.intervals[this.user.index], this.user.ws);
                    this.user.index++;
                }
                catch (error) {
                    console.error;
                }
            }
        }))();
    }
    stop() {
        console.log('stop');
        this.user.flag = false;
    }
    reset() {
        this.user.ws.send(JSON.stringify({
            kind: "data",
            data: this.data[0]
        }));
    }
}
exports.WebSocketMethods = WebSocketMethods;
