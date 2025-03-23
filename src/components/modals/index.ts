export * from "./modals";

export const modals = {
  toDoList: "toDoList",
  addToDo: "addToDo",
};

export type Modals = keyof typeof modals;
