import type { PostTable } from "@features/feed/types/post.type";
import supabase from "@utils/supabase";

export const getPost = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select<"*", PostTable>("*")
    .order("created_at", { ascending: true });

  if (error || !Array.isArray(data)) return [];
  return data as unknown[];
};
