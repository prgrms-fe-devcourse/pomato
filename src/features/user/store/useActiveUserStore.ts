import { create } from "zustand";

type ActiveUser = {
  id: string;
};

type ActiveUserState = {
  activeUsers: ActiveUser[];
  setActiveUsers: (users: ActiveUser[]) => void;
};

export const useActiveUsersStore = create<ActiveUserState>()((set) => ({
  activeUsers: [],
  setActiveUsers: (users) => set({ activeUsers: users }),
}));
