import { rowToComment } from "@features/feed/model/mappers";
import type { CommentTable } from "@features/feed/types/comment.type";
import type { Comment } from "@features/feed/types/post.type";
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

// 댓글 생성
export async function createComment(postId: string, content: string): Promise<Comment | null> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("post_comments")
    .insert({
      post_id: postId,
      user_id: userId,
      content,
    })
    .select("id,post_id,user_id,content,created_at")
    .single();

  if (error || !data) {
    console.error("댓글 생성 실패:", error?.message);
    return null;
  }

  // 프로필 정보 조회
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Comment 도메인 객체로 변환
  return rowToComment(data, profile || undefined);
}
