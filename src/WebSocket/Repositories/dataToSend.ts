import { TMarkSend, TMarkData, TStatusSend } from "../../Types/types";
import path from 'path'



export class DataToSend {
  public sendData(kind: string, data: TMarkData): TMarkSend {
    let result = {
      kind,
      data: {
        time: data.time.split("T")[1].split("+")[0],
        rpm: data.rpm,
        gear: data.gear,
        speed: data.speed,
      },
    };
    
    return result;
  }

  public sendStatus(kind: string, status: string): TStatusSend {
    let result = {
      kind,
      data: {
        status,
      },
    };
    return result;
  }
}
