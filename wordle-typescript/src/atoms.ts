import { atom } from "recoil";

export enum STATUS {
  "NOT_FINISHED",
  "WIN",
  "LOSE",
}

export interface IResult {
  result: STATUS;
}

export const answerState = atom({
  key: "answer",
  default: "",
});

export const isFinishState = atom<STATUS>({
  key: "isFinish",
  default: STATUS.NOT_FINISHED,
});

export const historyState = atom({
  key: "history",
  default: [""],
});
