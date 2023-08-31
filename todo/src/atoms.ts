import { atom } from "recoil";

export interface IToDo {
  text: string;
  category: "TODO" | "DOING" | "DONE";
  id: number;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const toDostate = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
