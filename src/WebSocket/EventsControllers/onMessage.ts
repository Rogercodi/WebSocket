// import ws from "ws";
// import { IOnMessage, TFileData, TMark } from "../../Types/types";
// import { calculateIntervals } from "../../helpers/calculateIntervals";


// export class OnMessage implements IOnMessage {
//   private index: number;
//   private flag: boolean;
//   private intervals: number[]

//     constructor(intervals: number[]){
//     this.index = 4000;
//     this.flag = true;
//     this.intervals = calculateIntervals();
    
//     // console.log(this.parsedData) 
//     }


//     public async onPlayCommand(data: TFileData, intervals: number[], ws: WebSocket) {
           
//         function delay(obj: TMark, time: number, ws: WebSocket) {
        
//             return new Promise<void>((resolve, reject) => setTimeout(() => {
//               //Error handling
//               if(typeof time !== 'number' || typeof obj !== 'object'){
//                 reject(console.error('Wrong Data'))
//               }
    
//               ws.send(JSON.stringify(
//                 {
//                   "kind": "data",
//                   "data": {
//                     "time": obj.time.split('T')[1].split('+')[0],
//                     "rpm": obj.rpm,
//                     "gear": obj.gear,
//                     "speed": obj.speed
//                   }
//                 }));
    
//               resolve();
//             }, time))
//           }
    
//           (async () => {
            
//             if(this.index === this.intervals.length - 1){
              
//               this.flag = false
//             }
//             while (this.flag) {
//               console.log(this.index)
//               try {
//                 await delay(data.data[this.index], intervals[this.index], ws)
//               this.index++
//               } catch (error) {
//                 console.error
//               }
//             }
//           })();
         

//     }

//     public async onStopCommand( ws: WebSocket) {
//         this.flag = false;

//       ws.send(JSON.stringify({
//         "kind": "status",
//         "data": {
//           status: "stop"
//         }
//       }));
//     }

//     public async onResetCommand(data: TFileData, ws: WebSocket) {
//         this.index = 0;
//         this.flag = false;

//             ws.send(JSON.stringify({
//               "kind": "data",
//               "data": {
//                 "time": data.data[0].time.split('T')[1].split('+')[0],
//                 "rpm": data.data[0].rpm,
//                 "gear": data.data[0].gear,
//                 "speed": data.data[0].speed
//               }
//             }));
            
      
//             ws.send(JSON.stringify({
//               kind: "status",
//               data: {
//                 status: "stop"
//               }
//             }));
//     }
// }