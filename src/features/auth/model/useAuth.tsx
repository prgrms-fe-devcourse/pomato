import { useEffect } from "react";

import { getProfile } from "@features/auth/api/profile";
import { useAuthStore } from "@stores/useAuthStore";
import supabase from "@utils/supabase";

export default function useAuth() {
  useEffect(() => {
    const { setAuth, resetAuth } = useAuthStore.getState();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") return;

      const uid = session?.user?.id ?? null;

      if (event === "INITIAL_SESSION") {
        if (session && uid) {
          const profile = await getProfile(uid);
          setAuth(session, profile);
        } else {
          resetAuth();
        }
        return;
      }

      if (event === "SIGNED_OUT") {
        resetAuth();
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        const { profile } = useAuthStore.getState();
        setAuth(session, profile);
        return;
      }

      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        if (!session) return;
        const profile = await getProfile(session.user.id);
        setAuth(session, profile);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
}
