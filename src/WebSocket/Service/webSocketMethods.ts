import { ICustomWebSocket } from "./customWebSocket";

import WebSocket from "ws";
import { DataToSend } from "../Repositories/dataToSend";
import { TMarkData } from "../../Types/types";

export class WebSocketMethods {
  message: string;
  user: ICustomWebSocket;
  data: TMarkData[];
  intervals: number[];

  constructor(parsedMessage: string, user: ICustomWebSocket) {
    this.message = parsedMessage;
    this.user = user;
    this.data = user.data;
    this.checkMethod();
    this.intervals = user.intervals;
  }

  public checkMethod() {
    switch (this.message) {
      case "play":
        this.play();
        break;

      case "stop":
        this.stop();
        break;

      case "reset":
        console.log("reset");
        this.reset();
    }
  }

  public play() {
    console.log(`Started by user ${this.user.id}`)
    this.user.flag = true;

    this.user.ws.send(JSON.stringify(new DataToSend().sendStatus('status', 'play')));
    
    function delay(obj: TMarkData, time: number, ws: WebSocket) {
      return new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          ws.send(JSON.stringify(new DataToSend().sendData("data", obj)));
          resolve();
        }, time)
      );
    }

    (async () => {
      if (this.user.index === this.user.intervals.length - 1) {
        this.user.flag = false;
      }
      while (this.user.flag) {
        try {
          await delay(
            this.user.data[this.user.index],
            this.user.intervals[this.user.index],
            this.user.ws
          );
          this.user.index++;
        } catch (error) {
          console.error;
        }
      }
    })();
  }

  public stop() {
    console.log(`Stopped by user ${this.user.id}`);
    this.user.flag = false;
    this.user.ws.send(
      JSON.stringify(new DataToSend().sendStatus("status", "stop"))
    );
  }

  public reset() {
    console.log(`Stopped by user ${this.user.id}`)
    this.user.flag = false;
    this.user.index = 0;
    this.user.ws.send(
      JSON.stringify(new DataToSend().sendStatus("status", "stop"))
    );
    this.user.ws.send(
      JSON.stringify(new DataToSend().sendData("data", this.data[0]))
    );
  }
}
