import WebSocket,{ WebSocketServer } from "ws";
import { API } from "../API";
import { IAPI, TMarkData } from "../Types/types";
import { CustomWebSocket } from "./Service/customWebSocket";;
import { DataFromFile } from "./Repositories/dataFromFile";
import { DataToSend } from "./Repositories/dataToSend";


export class webSocketServer {
  private API: IAPI;
  private wss: WebSocketServer;
  private data: TMarkData[];
  private intervals: number[];

  constructor() {
    this.API = new API();
    this.wss = new WebSocketServer({ server: this.API.http });
    this.data = new DataFromFile().data;
    this.intervals = new DataFromFile().intervalics;
    this.connection();
  };


  public async init(port: number) {
    try {
      await this.API.listen(port, '0.0.0.0');
    } catch (error) {
      console.log(error)
    }
  };

    public connection() {
      this.wss.on('connection', (ws: WebSocket) => {
        new CustomWebSocket(ws, this.data, this.intervals);
        ws.send(JSON.stringify(new DataToSend().sendData('data', this.data[0])))
      })
    };


};











