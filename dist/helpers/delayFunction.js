"use strict";
// import { TMark } from "./calculateIntervals";
// export function delay(obj: TMark, time: number,  ws?: WebSocket) {
//     return new Promise<void>((resolve, reject) => setTimeout(() => {
//       //Error handling
//       if(typeof time !== 'number' || typeof obj !== 'object'){
//         reject(console.error('Wrong Data'))
//       }
//       ws.send (JSON.stringify(
//         {
//           "kind": "data",
//           "data": {
//             "time": obj.time.split('T')[1].split('+')[0],
//             "rpm": obj.rpm,
//             "gear": obj.gear,
//             "speed": obj.speed
//           }
//         }));
//       resolve();
//     }, time))
//   }
