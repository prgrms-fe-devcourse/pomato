import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Profile } from "../types/auth.types";

type AuthState = {
  session: Session | null;
  profile: Profile | null;
};

type AuthAction = {
  setAuth: (session: Session | null, profile: Profile | null) => void;
  resetAuth: () => void;
};

type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      immer((set) => ({
        session: null,
        profile: null,

        setAuth: (session, profile) =>
          set((state) => {
            state.session = session;
            state.profile = profile;
          }),

        resetAuth: () =>
          set((state) => {
            state.session = null;
            state.profile = null;
          }),
      })),
      {
        name: "auth-storage",
      },
    ),
  ),
);

export const useSession = () => useAuthStore((state) => state.session);
export const useProfile = () => useAuthStore((state) => state.profile);
export const useIsLoggedIn = () => useAuthStore((state) => !!state.session);
export const useUserId = () => useAuthStore((state) => state.session?.user?.id);
