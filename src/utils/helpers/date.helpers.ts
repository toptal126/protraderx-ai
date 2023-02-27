import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { toInteger } from "./string.helpers";

export const dateDifFromNow = (_date: Date | string): string => {
  let date: Date = new Date();
  if (typeof _date === "object") date = _date;
  else date = new Date(_date);
  const difSeconds = Math.abs(new Date().getTime() - date.getTime()) / 1000;

  let result = "";
  if (difSeconds < 60) result = "a min";
  else if (difSeconds < 60 * 60)
    result = `${(difSeconds / 60).toFixed(0)} mins`;
  else if (difSeconds < 60 * 60 * 24)
    result = `${(difSeconds / 3600).toFixed(0)} hours`;
  else if (difSeconds < 60 * 60 * 24 * 7 * 2)
    result = `${(difSeconds / 87600).toFixed(0)} days`;
  else if (difSeconds < 60 * 60 * 24 * 30)
    result = `${(difSeconds / (60 * 60 * 24 * 7)).toFixed(0)} weeks`;
  else if (difSeconds < 60 * 60 * 24 * 30 * 12)
    result = `${(difSeconds / (60 * 60 * 24 * 30)).toFixed(0)} months`;
  else result = `${(difSeconds / (60 * 60 * 24 * 30 * 12)).toFixed(0)} years`;

  return new Date().getTime() - date.getTime() > 0
    ? `${result} ago`
    : `in ${result}`;
};

export const timerDifFromNow = (seconds: number): string => {
  seconds = Math.abs(seconds);
  const days = toInteger(seconds / SECONDS_PER_DAY);
  const hours = toInteger((seconds % SECONDS_PER_DAY) / 3600);
  const mins = toInteger((seconds % 3600) / 60);
  return `${days.toString().padStart(2, "0")}d : ${hours
    .toString()
    .padStart(2, "0")}h : ${mins.toString().padStart(2, "0")}m left`;
};
