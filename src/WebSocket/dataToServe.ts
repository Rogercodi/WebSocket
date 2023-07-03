import file from '../DataFile/simfile.json'
import { TMark } from '../Types/types';


export interface IData {
          time: string,
          rpm: number,
          gear: string,
          speed: number
      }


export interface IDataToServe {
    data: IData[],
    intervalics: number[]
}



export class DataToServe implements IDataToServe {
    data: IData[];
    intervalics: number[];


    constructor(){
        this.data = file.data;
        this.intervalics = this.getIntervals();
        console.log(this.intervalics)
    }

    private getIntervals () {
       
            //Transform time stamps to ms
            let getMili: number[] = [];
            file.data.map((mark: TMark) => {
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