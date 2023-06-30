import { v4 } from "uuid";
import WebSocket from "ws";
import { ParsedMessage } from "./parseMessage";
import { parse } from "dotenv";

export interface ICustomWebSocket {
  ws: WebSocket,
  id: string,
  index: number,
  flag: false
};

export class CustomWebSocket implements ICustomWebSocket {
    ws: WebSocket;
    id: string;
    index: number;
    flag: false;
  
    constructor (ws: WebSocket) {
      this.ws = ws,
      this.id = v4();
      this.index = 0;
      this.flag = false;
      this.getMessage();
    }
  
    public getUser () {
      return this;
    };

    public getMessage() {
        this.ws.on('message', (message: Buffer) => {
            const parsedMessage: string = new ParsedMessage().parseMessage(message)  
            
            let parsedData = ['play', 'stop', 'reset']

            if(parsedData.indexOf(parsedMessage) > -1) {
                //NEW MESSAGE SERVICE (message)
            } else {
                throw new Error
                
            }
        }
              
        )
    }


  };

  
