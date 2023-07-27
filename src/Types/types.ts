import * as http from "http";

export interface IAPI {
  http: http.Server;
  listen(port: number, host: string): Promise<void>;
}


export type TMarkData = {
  time: string;
  rpm: number;
  gear: string;
  speed: number;
};

export type TMarkSend = {
  kind: string,
  data: TMarkData
}

export type TStatusSend = {
  kind: string,
  data: {
    status: string
  }
}

export type TJsonFile = {
  startTime: string,
  data: TMarkData[]
}

export interface IDataFromFile {
  data: TMarkData[],
  intervalics: number[]
}
