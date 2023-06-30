import file from "../DataFile/simfile.json";
import { TMark } from "../Types/types";

export function calculateIntervals() {
  //Transform time stamps to ms
  const getMili: number[] = [];

  file.data.map((mark: TMark) => {
    getMili.push(new Date(mark.time).getTime());
  });

  //Time Interval between stamps
  const dataInterval = [0, 11];

  for (let x = 0; x < getMili.length - 1; x++) {
    let interval = getMili[x + 1] - getMili[x];
    dataInterval.push(interval);
  }
  return dataInterval;
}
