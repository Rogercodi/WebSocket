import WebSocket,{ WebSocketServer } from "ws";
import { API } from "../API";
import { IAPI } from "../Types/types";
import { WebSocketMethods } from "./webSocketMethods";
import {v4} from 'uuid'
import { CustomWebSocket } from "./customWebSocket";
// import { CustomWebSocket, ICustomWebSocket } from "./customWebSocket";



export class webSocketServer {
  private API: IAPI;
  private wss: WebSocketServer;
  public methods: any
 
  constructor() {
    this.API = new API();
    this.wss = new WebSocketServer({ server: this.API.http });
    this.connection()
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
        const user = new CustomWebSocket(ws);
      })
    }


};











