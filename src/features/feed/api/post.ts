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

  // 2) 게시글 댓글 조회
  const postIds = postRows.map((p) => p.id);

  const commentsRes = await supabase
    .from("post_comments")
    .select("id,post_id,user_id,content,created_at")
    .in("post_id", postIds)
    .order("created_at", { ascending: true });

  const commentRows: CommentRow[] = Array.isArray(commentsRes.data)
    ? commentsRes.data.filter((row) => isCommentRow(row))
    : [];

  // 3) 게시글 작성자와 댓글 작성자의 user_id 조회
  const authorIds = new Set<string>(postRows.map((p) => p.user_id));
  for (const c of commentRows) authorIds.add(c.user_id);
  const userIdList = [...authorIds];

  // 4) 게시글 작성자와 댓글 작성자의 프로필 조회
  const profilesRes = await supabase
    .from("profiles")
    .select("user_id,username,display_name,avatar_url")
    .in("user_id", userIdList);

  const profileRows: ProfileRow[] = Array.isArray(profilesRes.data)
    ? profilesRes.data.filter((row) => isProfileRow(row))
    : [];

  const profileByUserId = mapProfilesByUserId(profileRows);

  // 5) 댓글을 post_id별로 그룹화
  const commentsByPostId = groupBy(
    commentRows.filter((c) => c && c.post_id !== undefined),
    (c) => c.post_id,
  );

  // 6) 모든 게시글의 좋아요 개수와 현재 사용자의 좋아요 상태 조회
  const likesData = await getLikesForPosts(postIds);

  // 7) 도메인 객체 생성 (좋아요 버튼을 눌렀는지에 대한 여부 확인을 위해 객체 속성 추가)
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
    // image_url이 null이거나 기존 이미지와 다른 경우에만 기존 이미지 삭제
    if (
      post.image_url &&
      image_url !== undefined &&
      (image_url === null || post.image_url !== image_url)
    ) {
      await deletePostImage(post.image_url);
    }

    // 게시글 업데이트 (이미지가 변경되지 않았을 경우 image_url 필드를 업데이트하지 않음)
    const updateData: { content: string; image_url?: string | null } = { content };

    // image_url이 undefined가 아닌 경우에만 image_url 필드 업데이트
    if (image_url !== undefined) {
      updateData.image_url = image_url;
    }

    const { data, error } = await supabase
      .from("posts")
      .update(updateData)
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
