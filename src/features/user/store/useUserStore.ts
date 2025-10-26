import { create } from "zustand";

import type { ProfilesTable } from "@features/user/types/user.type";

type UserState<T> = {
  users: T[];
  userSearchKeyword: string;
};

type UserAction<T> = {
  setUserSearchKeyword: (keyword: string) => void;
  setUsers: (users: T[]) => void;
};

export const useUserStore = create<
  UserState<ProfilesTable["Row"]> & UserAction<ProfilesTable["Row"]>
>()((set) => ({
  users: [],
  userSearchKeyword: "",
  setUserSearchKeyword: (keyword) => set({ userSearchKeyword: keyword }),
  setUsers: (users) => set({ users: users }),
}));
