import { StoreHelper } from "../storeHelper";
import { ToDoItem, ToDoStatus } from "../../types/types";

export interface ToDosState {
  todos: ToDoItem[];
}

export const initialToDosState: ToDosState = {
  todos: [],
};

interface UseToDosStoreOutput extends ToDosState {
  setToDosPersisted: (todos: ToDoItem[]) => void;
  setNewToDo: (todo: ToDoItem) => void;
  setRemoveToDo: (id: string) => void;
  setUpdateToDo: (
    id: string,
    editedDescription?: string,
    editedBeginDate?: string
  ) => void;
  setCompleteToDo: (id: string) => void;
}

export const useToDosStore = StoreHelper.createStore<UseToDosStoreOutput>(
  (set) => ({
    ...initialToDosState,
    setNewToDo: (todo: ToDoItem) =>
      set(
        (state: ToDosState): ToDosState => {
          const guid = new Date().toString();
          const newTodoItem: ToDoItem = {
            id: guid,
            ...todo,
          };
          return {
            ...state,
            todos: [...state.todos, newTodoItem],
          };
        },
        false,
        "setNewToDo"
      ),
    setRemoveToDo: (id: string) =>
      set(
        (state: ToDosState): ToDosState => {
          const toDosUpdated = state.todos.filter((toDo) => toDo.id !== id);
          return {
            ...state,
            todos: toDosUpdated,
          };
        },
        false,
        "setRemoveToDo"
      ),
    setUpdateToDo: (
      id: string,
      editedDescription?: string,
      editedBeginDate?: string
    ) =>
      set(
        (state: ToDosState): ToDosState => {
          const toDosUpdated = state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                description: editedDescription || todo.description,
                beginDate: editedBeginDate || todo.beginDate,
              };
            }
            return todo;
          });
          return {
            ...state,
            todos: toDosUpdated,
          };
        },
        false,
        "setUpdateToDo"
      ),
    setCompleteToDo: (id: string) =>
      set(
        (state: ToDosState): ToDosState => {
          const toDosUpdated = state.todos.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                endDate: new Date().toDateString(),
                status: ToDoStatus.FINISHED,
              };
            }
            return todo;
          });
          return {
            ...state,
            todos: toDosUpdated,
          };
        },
        false,
        "setCompleteToDo"
      ),
    setToDosPersisted: (todos: ToDoItem[]) =>
      set(
        (state: ToDosState): ToDosState => {
          return {
            ...state,
            todos,
          };
        },
        false,
        "setNewToDo"
      ),
  }),
  "##TODO/STORE/TODOS/"
);
