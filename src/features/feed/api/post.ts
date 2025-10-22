import { deletePostImage } from "@features/feed/api/image";
import { getLikesForPosts } from "@features/feed/api/like";
import {
  groupBy,
  isCommentRow,
  isPostRow,
  isProfileRow,
  mapProfilesByUserId,
  rowToPost,
} from "@features/feed/model/mappers";
import type { CommentRow, PostRow, ProfileRow, Post } from "@features/feed/types/feed.types";
import supabase from "@utils/supabase";

// /** 게시글 목록 + 댓글 + 각 작성자 프로필 조회까지 */
export async function listPosts(): Promise<Post[]> {
  const postsRes = await supabase
    .from("posts")
    .select("id,user_id,content,image_url,created_at")
    .order("created_at", { ascending: false });

  if (postsRes.error || !Array.isArray(postsRes.data)) return [];
  const postRows: PostRow[] = [];
  for (const row of postsRes.data) {
    if (isPostRow(row)) postRows.push(row);
  }
  if (postRows.length === 0) return [];

  // 2) comments for those posts
  const postIds = postRows.map((p) => p.id);

  const commentsRes = await supabase
    .from("post_comments")
    .select("id,post_id,user_id,content,created_at")
    .in("post_id", postIds)
    .order("created_at", { ascending: true });

  const commentRows: CommentRow[] = Array.isArray(commentsRes.data)
    ? commentsRes.data.filter((row) => isCommentRow(row))
    : [];

  // 3) gather ALL user_ids (post authors + comment authors)
  const authorIds = new Set<string>(postRows.map((p) => p.user_id));
  for (const c of commentRows) authorIds.add(c.user_id);
  const userIdList = [...authorIds];

  // 4) fetch profiles for these user_ids
  const profilesRes = await supabase
    .from("profiles")
    .select("user_id,username,display_name,avatar_url")
    .in("user_id", userIdList);

  const profileRows: ProfileRow[] = Array.isArray(profilesRes.data)
    ? profilesRes.data.filter((row) => isProfileRow(row))
    : [];

  const profileByUserId = mapProfilesByUserId(profileRows);

  // 5) group comments by post_id
  const commentsByPostId = groupBy(
    commentRows.filter((c) => c && c.post_id !== undefined),
    (c) => c.post_id,
  );

  // 6) get likes for all posts
  const likesData = await getLikesForPosts(postIds);

  // 7) compose domain
  const posts: Post[] = postRows.map((row) => {
    const likeInfo = likesData[row.id] || { count: 0, liked: false };
    return rowToPost(
      row,
      commentsByPostId[row.id] ?? [],
      profileByUserId.get(row.user_id),
      profileByUserId,
      likeInfo.count,
      likeInfo.liked,
    );
  });

  return posts;
}

// 게시글 생성
export async function createPost(content: string, image_url?: string): Promise<Post | null> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      content,
      image_url: image_url ?? null,
    })
    .select("id,user_id,content,image_url,created_at")
    .single();

  if (error || !data) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Database.types.ts 변화에 따른 임시 조치 (추후 수정 필요)
  return rowToPost(
    { ...data, comments_count: 0, likes_count: 0 },
    [],
    profile ?? undefined,
    new Map(),
    0,
    false,
  );
}

// 게시글 수정
export async function updatePost(
  id: string,
  content: string,
  image_url?: string,
): Promise<Post | null> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return null;

  try {
    // 소유자 확인 및 기존 이미지 URL 가져오기
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id, image_url")
      .eq("id", id)
      .single();

    if (fetchError || !post || post.user_id !== userId) {
      return null;
    }

    // 기존 이미지가 있고 새로운 이미지로 변경되거나 이미지를 제거하는 경우
    if (post.image_url && post.image_url !== image_url) {
      await deletePostImage(post.image_url);
    }

    // 게시글 업데이트
    const { data, error } = await supabase
      .from("posts")
      .update({
        content,
        image_url: image_url ?? null,
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select("id,user_id,content,image_url,created_at")
      .single();

    if (error || !data) {
      return null;
    }

    // 프로필 정보 가져오기
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    // Database.types.ts 변화에 따른 임시 조치 (추후 수정 필요)
    return rowToPost(
      { ...data, comments_count: 0, likes_count: 0 },
      [],
      profile ?? undefined,
      new Map(),
      0,
      false,
    );
  } catch {
    return null;
  }
}

// 삭제(소유자만)
export async function deletePost(id: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return false;

  try {
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id, image_url")
      .eq("id", id)
      .single();

    if (fetchError || !post) {
      return false;
    }

    if (post.user_id !== userId) {
      return false;
    }

    if (post.image_url) {
      await deletePostImage(post.image_url);
    }

    const { error } = await supabase.from("posts").delete().eq("id", id).eq("user_id", userId);

    if (error) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
