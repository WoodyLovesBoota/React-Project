import { atom, selector } from "recoil";

interface IToDoState {
  [key: string]: ITodo[];
}

export interface ITodo {
  id: number;
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    TrashLILI: [],
  },
  effects: [
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem("toDo");
      if (savedValue !== null) setSelf(JSON.parse(savedValue));
      onSet((newValue: any, _: any, isReset: boolean) => {
        isReset
          ? localStorage.removeItem("toDo")
          : localStorage.setItem("toDo", JSON.stringify(newValue));
      });
    },
  ],
});
