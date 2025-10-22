import supabase from "@utils/supabase";

// 좋아요 추가
export async function addLike(postId: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return false;

  try {
    const { error } = await supabase.from("post_likes").insert({
      post_id: postId,
      user_id: userId,
    });

    if (error) {
      console.error("좋아요 추가 실패:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("좋아요 추가 중 오류:", error);
    return false;
  }
}

// 좋아요 제거
export async function removeLike(postId: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return false;

  try {
    const { error } = await supabase
      .from("post_likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (error) {
      console.error("좋아요 제거 실패:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("좋아요 제거 중 오류:", error);
    return false;
  }
}

// 특정 게시글의 좋아요 개수 조회
export async function getLikeCount(postId: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("post_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);

    if (error) {
      console.error("좋아요 개수 조회 실패:", error.message);
      return 0;
    }
    return count || 0;
  } catch (error) {
    console.error("좋아요 개수 조회 중 오류:", error);
    return 0;
  }
}

// 현재 사용자가 특정 게시글을 좋아요했는지 확인
export async function isLikedByUser(postId: string): Promise<boolean> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;
  if (!userId) return false;

  try {
    const { data, error } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116은 "no rows returned" 에러
      console.error("좋아요 상태 확인 실패:", error.message);
      return false;
    }
    return !!data;
  } catch (error) {
    console.error("좋아요 상태 확인 중 오류:", error);
    return false;
  }
}

// 여러 게시글의 좋아요 개수와 현재 사용자의 좋아요 상태를 한번에 조회
export async function getLikesForPosts(postIds: string[]): Promise<{
  [postId: string]: { count: number; liked: boolean };
}> {
  const { data: auth } = await supabase.auth.getUser();
  const userId = auth?.user?.id;

  const result: { [postId: string]: { count: number; liked: boolean } } = {};

  try {
    // 각 게시글의 좋아요 개수 조회
    const { data: counts, error: countError } = await supabase
      .from("post_likes")
      .select("post_id")
      .in("post_id", postIds);

    if (countError) {
      console.error("좋아요 개수 조회 실패:", countError.message);
      return result;
    }

    // 좋아요 개수 계산
    const likeCounts: { [postId: string]: number } = {};
    counts?.forEach((like) => {
      likeCounts[like.post_id] = (likeCounts[like.post_id] || 0) + 1;
    });

    // 현재 사용자의 좋아요 상태 조회 (로그인된 경우에만)
    let userLikes: string[] = [];
    if (userId) {
      const { data: userLikeData, error: userLikeError } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", userId)
        .in("post_id", postIds);

      if (!userLikeError && userLikeData) {
        userLikes = userLikeData.map((like) => like.post_id);
      }
    }

    // 결과 구성
    postIds.forEach((postId) => {
      result[postId] = {
        count: likeCounts[postId] || 0,
        liked: userLikes.includes(postId),
      };
    });

    return result;
  } catch (error) {
    console.error("좋아요 정보 조회 중 오류:", error);
    return result;
  }
}
