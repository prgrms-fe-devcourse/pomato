import { create } from "zustand";

import type { ProfilesTable } from "@features/user/types/user.type";

type UserState<T> = {
  users: T[];
};

type UserAction<T> = {
  setUsers: (users: T[]) => void;
};

export const useUserStore = create<
  UserState<ProfilesTable["Row"]> & UserAction<ProfilesTable["Row"]>
>()((set) => ({
  users: [],
  setUsers: (users) => set({ users: users }),
}));
