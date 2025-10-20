import supabase from "@utils/supabase";

import type { OAuthProviders } from "../types/auth.types";

export const loginWithOAuth = async (provider: OAuthProviders) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${globalThis.location.origin}/panel`,
    },
  });

  if (error) throw new Error("간편 로그인 오류");
};
