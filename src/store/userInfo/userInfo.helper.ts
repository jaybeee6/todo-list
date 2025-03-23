import { StoreHelper } from "../storeHelper";

export interface UserInfoState {
  name: string;
}

export const initialUserInfoState: UserInfoState = {
  name: "",
};

interface UseUserInfoStoreOutput extends UserInfoState {
  setUserName: (name: string) => void;
}

export const useUserInfoStore = StoreHelper.createStore<UseUserInfoStoreOutput>(
  (set) => ({
    ...initialUserInfoState,
    setUserName: (name: string) =>
      set(
        (state: UserInfoState): UserInfoState => {
          return {
            ...state,
            name,
          };
        },
        false,
        "setUserName"
      ),
  }),
  "##TODO/STORE/UserInfo/"
);
