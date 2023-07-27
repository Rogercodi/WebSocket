import path from 'path';


import { IDataFromFile, TMarkData } from '../../Types/types';
import { getConfiguration } from '../../config/getConfig';




export class DataFromFile implements IDataFromFile {
    data: TMarkData[];
    intervalics: number[];


    constructor(){
        this.data = this.getData();
        this.intervalics = this.getIntervals();
    }

    private getData () {
      const fileDir = new getConfiguration().getEnvVar().fileDir;
      console.log(path.join(__dirname + fileDir))
      const jsonFile = require(path.join(__dirname + fileDir));
      return jsonFile.data;
    }

    private getIntervals () {
       
            //Transform time stamps to ms
            let getMili: number[] = [];
            this.data.map((mark: TMarkData) => {
              getMili.push(new Date(mark.time).getTime());
            });
          
            //Time Interval between stamps
            const dataInterval = [0];
          
            for (let x = 0; x < getMili.length - 1; x++) {
              let interval = getMili[x + 1] - getMili[x];
              dataInterval.push(interval);
            }
            return dataInterval;
    }

}