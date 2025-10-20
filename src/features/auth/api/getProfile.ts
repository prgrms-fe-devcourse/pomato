import type { Tables } from "@type/database.types";
import supabase from "@utils/supabase";

export type ProfileRow = Tables<"profiles">;

export const getProfile = async (id: string): Promise<ProfileRow> => {
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", id).single();

  if (error || !data) throw new Error("프로필 조회 오류");

  return data;
};
