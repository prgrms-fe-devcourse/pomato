import type { Session } from "@supabase/supabase-js";

import supabase from "@utils/supabase";

import { getProfile } from "../api/getProfile";
import type { Profile } from "../types/auth.types";

export type authLoaderData = {
  session: Session | null;
  profile: Profile | null;
};

export const authLoader = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { session: null, profile: null };
  }

  const profile = await getProfile(session.user.id);
  return { session, profile };
};
