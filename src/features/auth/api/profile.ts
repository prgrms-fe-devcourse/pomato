import type { ProfileRow } from "@type/auth.types";
import supabase from "@utils/supabase";

export const getProfile = async (id: string): Promise<ProfileRow | null> => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .single();

  if (error || !profile) {
    console.error("프로필 조회 오류:", error);
    return null;
  }

  return profile;
};
