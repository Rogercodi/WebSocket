
import { webSocketServer } from "../WSS";
import file from "../../DataFile/simfile.json";
import { TFileData, TMessageData, TMark } from "../../Types/types";
import { calculateIntervals } from "../../helpers/calculateIntervals";




export class OnConnectionWss {
  public parsedData: TFileData = { startTime: "", data: [] };
  private intervals: number[] = [];

  constructor() {}

  public async connection(ws: WebSocket): Promise<void> {
    this.parsedData = file;
    this.intervals = calculateIntervals();
    let index = 0;
    let flag = false;

    ws.send(
      JSON.stringify({
        kind: "data",
        data: {
          time: this.parsedData.data[0].time.split("T")[1].split("+")[0],
          rpm: this.parsedData.data[0].rpm,
          gear: this.parsedData.data[0].gear,
          speed: this.parsedData.data[0].speed,
        },
      })
    );

    ws.addEventListener("message", (message: MessageEvent) => {
      let data: TMessageData = JSON.parse(message.data);

      if (data.command === "play") {
        flag = true;
       
        ws.send(
          JSON.stringify({
            kind: "status",
            data: {
              status: "play",
            },
          })
        );

        function delay(obj: TMark, time: number) {
          return new Promise<TMark | void>((resolve, reject) =>
            setTimeout(() => {
              ws.send(
                JSON.stringify({
                  kind: "data",
                  data: {
                    time: obj.time.split("T")[1].split("+")[0],
                    rpm: obj.rpm,
                    gear: obj.gear,
                    speed: obj.speed,
                  },
                })
              );

              resolve();
            }, time)
          );
        }

        (async () => {
          if (index === this.parsedData.data.length - 3) {
            console.log('end!')
            flag = false;

          }
          while (flag === true) {
            if (index === this.parsedData.data.length - 1) {
             flag = false;
             ws.send(
              JSON.stringify({
                kind: "status",
                data: {
                  status: "stop",
                },
              })
            );
            }
            
            try {
              await delay(this.parsedData.data[index], this.intervals[index]);
              index++;
            } catch (error) {
              console.error;
            }
          }
        })();
      }

      if (data.command === "stop") {
        flag = false;

        ws.send(
          JSON.stringify({
            kind: "status",
            data: {
              status: "stop",
            },
          })
        );
      }

      if (data.command === "reset") {
        flag = false;
        index = 0;

        ws.send(
          JSON.stringify({
            kind: "data",
            data: {
              time: this.parsedData.data[0].time.split("T")[1].split("+")[0],
              rpm: this.parsedData.data[0].rpm,
              gear: this.parsedData.data[0].gear,
              speed: this.parsedData.data[0].speed,
            },
          })
        );

        ws.send(
          JSON.stringify({
            kind: "status",
            data: {
              status: "stop",
            },
          })
        );
      }
    });
  }
}
