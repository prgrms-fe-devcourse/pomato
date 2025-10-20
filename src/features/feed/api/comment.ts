import type { CommentTable } from "@features/feed/types/comment.type";
import supabase from "@utils/supabase";

export const getComment = async (post_id: string) => {
  const { data, error } = await supabase
    .from("post_comments")
    .select<"*", CommentTable>("*")
    .eq("post_id", post_id)
    .order("created_at", { ascending: true });

  if (error || !Array.isArray(data)) return [];
  return data as unknown[];
};
