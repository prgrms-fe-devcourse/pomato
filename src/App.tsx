import { useEffect } from "react";

import { getProfile } from "@features/auth/api/profile";
import { useAuthStore } from "@features/auth/model/useAuthStore";
import Timer from "@features/timer";
import Main from "@layout/main";
import Panel from "@layout/panel";
import supabase from "@utils/supabase";

export default function App() {
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "TOKEN_REFRESHED" ||
        event === "PASSWORD_RECOVERY"
      )
        return;

      const store = useAuthStore.getState();
      const uid = session?.user?.id ?? null;

      if (event === "SIGNED_OUT" || !uid) {
        store.resetAuth();
        return;
      }

      const profile = await getProfile(uid);
      store.setAuth(session, profile);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  return (
    <Main>
      <Timer />
      <Panel />
    </Main>
  );
}
