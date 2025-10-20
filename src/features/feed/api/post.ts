import {
  isPostRow,
  isProfileRow,
  mapProfilesByUserId,
  rowToPost,
} from "@features/feed/model/mappers";
import type { PostRow, ProfileRow } from "@features/feed/model/tables";
import type { Post } from "@features/feed/types/post.type";
import supabase from "@utils/supabase";

export async function listPosts(): Promise<Post[]> {
  // 1) posts만 조회
  const postsRes = await supabase
    .from("posts")
    .select("id,user_id,content,image_url,created_at")
    .order("created_at", { ascending: false });

  if (postsRes.error || !Array.isArray(postsRes.data)) return [];

  // 타입가드로 필터 (no-unsafe)
  const postRows: PostRow[] = postsRes.data.filter((r): r is PostRow => isPostRow(r));
  if (postRows.length === 0) return [];

  // 2) 작성자 user_id 수집(중복 제거)
  const userIds = [...new Set(postRows.map((p) => p.user_id))];

  // 3) 해당 프로필 조회
  const profilesRes = await supabase
    .from("profiles")
    .select("user_id,username,display_name,avatar_url")
    .in("user_id", userIds);

  const profileRows: ProfileRow[] = Array.isArray(profilesRes.data)
    ? profilesRes.data.filter((r): r is ProfileRow => isProfileRow(r))
    : [];

  const profileByUserId = mapProfilesByUserId(profileRows);

  // 4) Post 조립 (comments는 제외 → 빈 배열 전달)
  const posts: Post[] = postRows.map((row) => rowToPost(row, [], profileByUserId.get(row.user_id)));

  return posts;
}

// /** 게시글 목록 + 댓글 + 각 작성자 프로필까지 조립 (추후 백업용)*/
// export async function listAllData(): Promise<Post[]> {
//   // 1) posts
//   const postsRes = await supabase
//     .from("posts")
//     .select("id,user_id,content,image_url,created_at")
//     .order("created_at", { ascending: false });

//   if (postsRes.error || !Array.isArray(postsRes.data)) return [];
//   const postRows: PostRow[] = [];
//   for (const row of postsRes.data) {
//     if (isPostRow(row)) postRows.push(row);
//   }
//   if (postRows.length === 0) return [];

//   // 2) comments for those posts
//   const postIds = postRows.map((p) => p.id);

//   const commentsRes = await supabase
//     .from("post_comments")
//     .select("id,post_id,user_id,content,created_at")
//     .in("post_id", postIds)
//     .order("created_at", { ascending: true });

//   const commentRows: CommentRow[] = Array.isArray(commentsRes.data)
//     ? commentsRes.data.filter((row) => isCommentRow(row))
//     : [];

//   // 3) gather ALL user_ids (post authors + comment authors)
//   const authorIds = new Set<string>(postRows.map((p) => p.user_id));
//   for (const c of commentRows) authorIds.add(c.user_id);
//   const userIdList = [...authorIds];

//   // 4) fetch profiles for these user_ids
//   const profilesRes = await supabase
//     .from("profiles")
//     .select("user_id,username,display_name,avatar_url")
//     .in("user_id", userIdList);

//   const profileRows: ProfileRow[] = Array.isArray(profilesRes.data)
//     ? profilesRes.data.filter((row) => isProfileRow(row))
//     : [];

//   const profileByUserId = mapProfilesByUserId(profileRows);

//   // 5) group comments by post_id
//   const commentsByPostId = groupBy(commentRows, (c) => c.post_id);

//   // 6) compose domain
//   const posts: Post[] = postRows.map((row) =>
//     rowToPost(
//       row,
//       commentsByPostId[row.id] ?? [],
//       profileByUserId.get(row.user_id),
//       profileByUserId
//     )
//   );

//   return posts;
// }

// 삭제(소유자만)
export async function deletePost(id: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return false;

  const { error } = await supabase.from("posts").delete().eq("id", id).eq("user_id", userId);

  if (error) {
    console.error(error.message);
    return false;
  }
  return true;
}
