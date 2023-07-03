import WebSocket,{ WebSocketServer } from "ws";
import { API } from "../API";
import { IAPI } from "../Types/types";
import { CustomWebSocket } from "./customWebSocket";
import { DataToServe, IData } from "./dataToServe";


export class webSocketServer {
  private API: IAPI;
  private wss: WebSocketServer;
  private data: IData[];
  private intervals: number[];

  constructor() {
    this.API = new API();
    this.wss = new WebSocketServer({ server: this.API.http });
    this.data = new DataToServe().data;
    this.intervals = new DataToServe().intervalics;
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
        console.log('new connection established')
        new CustomWebSocket(ws, this.data, this.intervals);
      })
    };


};











