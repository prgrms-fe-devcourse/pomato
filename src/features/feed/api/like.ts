import supabase from "@utils/supabase";

// RPC 함수를 사용한 좋아요 토글 (원자적 처리)
export async function toggleLike(postId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc("toggle_like", {
      p_post_id: postId,
    });

    if (error) {
      console.error("좋아요 토글 실패:", error.message);
      return false;
    }

    // RPC 함수가 true를 반환하면 좋아요 추가됨, false면 좋아요 취소됨
    return data === true;
  } catch (error) {
    console.error("좋아요 토글 중 오류:", error);
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
