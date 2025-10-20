import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Database } from "@type/database.types";

type DataProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type Profile = Pick<DataProfile, "user_id" | "display_name" | "username" | "avatar_url">;

type AuthStore = {
  session: Session | null;
  profile: Profile | null;

  setAuth: (session: Session | null, profile: Profile | null) => void;
  getSession: () => Session | null;
  getProfile: () => Profile | null;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    immer((set, get) => ({
      session: null,
      profile: null,

      setAuth: (session, profile) =>
        set((state) => {
          state.session = session;
          state.profile = profile;
        }),

      getSession: () => {
        return get().session;
      },

      getProfile: () => {
        return get().profile;
      },

      resetAuth: () =>
        set((state) => {
          state.session = null;
          state.profile = null;
        }),
    })),
  ),
);
