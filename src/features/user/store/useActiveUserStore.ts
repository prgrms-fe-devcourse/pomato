import { create } from "zustand";

type ActiveUser = {
  id: string;
};

type ActiveUserState = {
  activeUsers: ActiveUser[];
  setActiveUsers: (users: ActiveUser[]) => void;
  addActiveUsers: (users: ActiveUser[]) => void;
  removeActiveUsers: (users: ActiveUser[]) => void;
};

export const useActiveUsersStore = create<ActiveUserState>()((set) => ({
  activeUsers: [],

  setActiveUsers: (users) => set({ activeUsers: users }),

  addActiveUsers: (users) =>
    set((state) => ({
      activeUsers: [
        ...state.activeUsers,
        ...users.filter((u) => !state.activeUsers.some((existing) => existing.id === u.id)),
      ],
    })),

  removeActiveUsers: (users) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter(
        (existing) => !users.some((left) => left.id === existing.id),
      ),
    })),
}));
