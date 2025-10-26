import type { OAuthProvider } from "@type/auth.types";
import supabase from "@utils/supabase";

export const loginWithOAuth = async (provider: OAuthProvider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${globalThis.location.origin}/`,
    },
  });

  if (error) {
    console.error("간편 로그인 오류:", error);
    throw new Error("간편 로그인 오류");
  }
};
