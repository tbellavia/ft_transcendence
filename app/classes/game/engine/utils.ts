import { constrain } from "./constrain";

export function randomInt(min: number, max: number) : number {
    return Math.random() * (max - min) + min;
}

export function map(value, start1, stop1, start2, stop2) : number {
    const newval = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    }
    return constrain(newval, stop2, start2);
}