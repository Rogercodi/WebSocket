import * as http from "http";

export interface IAPI {
  http: http.Server;
  listen(port: number, host: string): Promise<void>;
}

export interface IOnMessage {
  onPlayCommand(data: TFileData, intervals: number[], ws: WebSocket): void;
  onStopCommand(ws: WebSocket): void;
  onResetCommand(data: TFileData, ws: WebSocket): void;
}

export type TMessageData = {
  command: string;
};

export type TFileData = {
  startTime: string;
  data: TMark[];
};

export interface IOnConnectionWss {
  data: TFileData;
}

export type TMark = {
  time: string;
  rpm: number;
  gear: string;
  speed: number;
};
