import { useEffect } from "react";

import { getProfile } from "@features/auth/api/profile";
import Timer from "@features/timer";
import Main from "@layout/main";
import Panel from "@layout/panel";
import { useAuthStore } from "@stores/useAuthStore";
import supabase from "@utils/supabase";

export default function App() {
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "INITIAL_SESSION" || event === "PASSWORD_RECOVERY") return;

      const authStore = useAuthStore.getState();
      const uid = session?.user?.id ?? null;

      if (event === "SIGNED_OUT" || !uid) {
        authStore.resetAuth();
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        authStore.setAuth(session, authStore.profile);
      }

      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const profile = await getProfile(uid);
        authStore.setAuth(session, profile);
      }
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
