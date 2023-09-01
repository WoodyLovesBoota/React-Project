import { atom, selector } from "recoil";

export enum Categories {
  "TODO",
  "DOING",
  "DONE",
}

export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TODO,
});

export const toDostate = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDostate);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
