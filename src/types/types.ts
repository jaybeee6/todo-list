export enum ToDoStatus {
  NEW = "NEW",
  ONGOING = "ONGOING",
  FINISHED = "FINISHED",
}

export interface ToDoItem {
  autor: string;
  description: string;
  beginDate: string;
  endDate?: string;
  status: ToDoStatus;
  id?: string;
}
