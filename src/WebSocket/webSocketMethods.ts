import { ICustomWebSocket } from "./customWebSocket";
import { IData } from "./dataToServe";
import WebSocket from "ws";


export class WebSocketMethods {
    message: string;
    user: ICustomWebSocket;
    data: IData[];
    
    constructor(parsedMessage: string, user: ICustomWebSocket) {
        this.message = parsedMessage;
        this.user = user;
        this.data = user.data;
        this.checkMethod();
    }


   public checkMethod () {
    switch (this.message){
        case 'play':
            console.log('play');
            this.user.flag = true;
            this.play();
            break;
        
        case 'stop':
            this.stop()
            break;

        case 'reset':
            console.log('reset')
            this.reset();
    }
   }

   public play (){
    function delay (obj: IData, time: number, ws: WebSocket){ 
        return new Promise<void>((resolve, reject) => setTimeout(() => {
            //Error handling
            ws.send(JSON.stringify(
              {
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

      (async () => {
        // if(this.user.index === this.user.intervals.length - 1){
        //   flag = false
        // }
        while (this.user.flag) {
          try {
            await delay(this.user.data[this.user.index], this.user.intervals[this.user.index], this.user.ws)
          this.user.index++
          } catch (error) {
            console.error
          }
        }
      })();

    }
        
   


   public stop (){
    console.log('stop');
    this.user.flag = false;
    
   }


   public reset (){

    this.user.ws.send(JSON.stringify({
        kind: "data",
        data: this.data[0]
    }))
   }

}