import { atom } from "recoil";

export const answerState = atom({
  key: "answer",
  default: "",
});

export const isFinishState = atom({
  key: "isFinish",
  // default: ""
});
