import { v4 } from "uuid";
import WebSocket from "ws";
import { ParsedMessage } from "./parseMessage";
import { WebSocketMethods } from "./webSocketMethods";
import { IData } from "./dataToServe";

export interface ICustomWebSocket {
  ws: WebSocket;
  id: string;
  index: number;
  flag: boolean;
  data: IData[];
  intervals: number[]
}



export class CustomWebSocket implements ICustomWebSocket {
  ws: WebSocket;
  id: string;
  index: number;
  flag: boolean;
  data: IData[];
  intervals: number[];

  constructor(ws: WebSocket, data: IData[], intervals: number[]) {
    this.ws = ws; 
    this.id = v4();
    this.index = 0;
    this.flag = false;
    this.data = data;
    this.intervals = intervals;
    this.getMessage();
  }

  public getUser() {
    return this;
  }

  public getMessage() {
    this.ws.on("message", (message: Buffer) => {
      const parsedMessage: string = new ParsedMessage().parseMessage(message);

      let parsedData = ["play", "stop", "reset"];

      if (parsedData.indexOf(parsedMessage) > -1) {
        let user: ICustomWebSocket = this.getUser();
        new WebSocketMethods(parsedMessage, user);
      } else {
        throw new Error();
      }
    });
  }
}
