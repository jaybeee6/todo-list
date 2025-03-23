import { useState } from "react";

import supabase from "../../../config/supabaseClient";
import { useToDosStore, useUserInfoStore } from "../../../store";
import { ToDoItem, ToDoStatus } from "../../../types/types";
import { useModal } from "../../../hooks";

export interface UseToDoListModalHookOutput {
  isVisibleModal: boolean;
  hide: () => void;
  showAddToDo: () => void;
  handleDeleteToDo: (id: string) => Promise<void>;
  handleCompleteToDo: (id: string) => Promise<void>;
  editingIndex?: number;
  editedDescriptionToDo: string;
  setEditedDescriptionToDo: React.Dispatch<React.SetStateAction<string>>;
  editedBeginDateToDo: string;
  setEditedBeginDateToDo: React.Dispatch<React.SetStateAction<string>>;
  filter: "all" | "pending" | "completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "pending" | "completed">
  >;
  handleToDoEdition: (index: number) => void;
  handleUpdateToDo: (id: string) => Promise<void>;
  filteredTasks: ToDoItem[];
  username: string;
  handleDateFormat: (date: string) => string;
}

export const useToDoListModalHelper = (): UseToDoListModalHookOutput => {
  const { hide, isVisibleModal } = useModal("toDoList");
  const { show: showAddToDo } = useModal("addToDo");
  const todos = useToDosStore((state) => state.todos);
  const username = useUserInfoStore((state) => state.name);

  const setRemoveToDo = useToDosStore((state) => state.setRemoveToDo);
  const setUpdateToDo = useToDosStore((state) => state.setUpdateToDo);
  const setCompleteToDo = useToDosStore((state) => state.setCompleteToDo);

  const [editingIndex, setEditingIndex] = useState<number>();
  const [editedDescriptionToDo, setEditedDescriptionToDo] =
    useState<string>("");
  const [editedBeginDateToDo, setEditedBeginDateToDo] = useState<string>(
    new Date().toDateString()
  );

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const handleToDoEdition = (index: number) => {
    setEditingIndex(index);
    setEditedDescriptionToDo(todos[index].description);
    setEditedBeginDateToDo(todos[index].beginDate);
  };

  const handleUpdateToDo = async (id: string) => {
    setEditingIndex(undefined);
    setUpdateToDo(id, editedDescriptionToDo, editedBeginDateToDo);
    await supabase
      .from("todos")
      .update([
        {
          beginDate: new Date(editedBeginDateToDo),
          description: editedDescriptionToDo,
        },
      ])
      .eq("id", id);
  };

  const handleCompleteToDo = async (id: string) => {
    setCompleteToDo(id);
    await supabase
      .from("todos")
      .update([
        {
          status: ToDoStatus.FINISHED,
          endDate: new Date(),
        },
      ])
      .eq("id", id);
  };

  const handleDeleteToDo = async (id: string) => {
    setRemoveToDo(id || "");
    await supabase.from("todos").delete().eq("id", id);
  };

  const filteredTasks = todos.filter((todo) => {
    if (filter === "pending" && todo.autor === username) {
      return todo.status === ToDoStatus.ONGOING;
    } else if (filter === "completed" && todo.autor === username) {
      return todo.status === ToDoStatus.FINISHED;
    } else if (todo.autor === username) {
      return true;
    } else {
      return false;
    }
  });

  const handleDateFormat = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  return {
    editedBeginDateToDo,
    editedDescriptionToDo,
    filter,
    filteredTasks,
    handleDeleteToDo,
    handleToDoEdition,
    handleUpdateToDo,
    hide,
    isVisibleModal,
    handleCompleteToDo,
    setEditedBeginDateToDo,
    setEditedDescriptionToDo,
    setFilter,
    showAddToDo,
    editingIndex,
    username,
    handleDateFormat,
  };
};
