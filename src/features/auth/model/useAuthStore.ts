import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Profile } from "../types/auth.types";

type AuthState = {
  session: Session | null;
  profile: Profile | null;

  setAuth: (session: Session | null, profile: Profile | null) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
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
    { name: "AuthStore" },
  ),
);

export const useSession = () => useAuthStore((state) => state.session);
export const useProfile = () => useAuthStore((state) => state.profile);
export const useIsLoggedIn = () => useAuthStore((state) => !!state.session);
export const useUserId = () => useAuthStore((state) => state.session?.user?.id);
