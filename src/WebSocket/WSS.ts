import { WebSocketServer } from "ws";
import { API } from "../API";
import { IAPI } from "../Types/types";
import { OnConnectionWss } from "./EventsControllers/onConnection";

export class webSocketServer {
  private API: IAPI;
  private wss: WebSocketServer;
 
  
  
  constructor() {
    this.API = new API();
    this.wss = new WebSocketServer({ server: this.API.http });
    this.wss.on("connection", new OnConnectionWss().connection.bind(OnConnectionWss));
  };


  public async init(port: number) {
    try {
      await this.API.listen(port, '0.0.0.0');
      
    } catch (error) {
      console.log(error)
    }
  };
};

