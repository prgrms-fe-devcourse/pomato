import { useAuthStore } from "./useAuthStore";
import { getProfile } from "../api/profile";
import { getSession } from "../api/session";

export const authLoader = async () => {
  const session = await getSession();
  const authStore = useAuthStore.getState();

  if (session) {
    const profile = await getProfile(session.user.id);
    authStore.setAuth(session, profile);
  } else {
    authStore.resetAuth();
  }
};
