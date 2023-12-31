import file from "../DataFile/simfile.json";
import { TMarkData} from "../Types/types";

export function calculateIntervals() {
  //Transform time stamps to ms
  let getMili: number[] = [];

  file.data.map((mark: TMarkData) => {
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
