import { useState } from "react";
import { useModal } from "../../hooks";
import { useUserInfoStore } from "../../store";

export interface UseAuthenticationHookOutput {
  name: string;
  handleViewToDoList: () => void;
  handleOnChangeName: (value: string) => void;
}

export const useAuthenticationHelper = (): UseAuthenticationHookOutput => {
  const [name, setName] = useState("");
  const { show } = useModal("toDoList");
  const setUserName = useUserInfoStore((state) => state.setUserName);

  const handleOnChangeName = (value: string): void => {
    setName(value);
  };

  const handleViewToDoList = (): void => {
    setUserName(name);
    show();
  };

  return { handleViewToDoList, handleOnChangeName, name };
};
