import { useAuthStore } from "./useAuthStore";
import { getProfile } from "../api/profile";
import { getSession } from "../api/session";

export const authLoader = async () => {
  const session = await getSession();

  if (session) {
    const profile = await getProfile(session.user.id);
    useAuthStore.getState().setAuth(session, profile);
  }
};
