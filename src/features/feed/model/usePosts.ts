import { useCallback, useState } from "react";

import { createComment } from "@features/feed/api/comment";
import { addLike, removeLike } from "@features/feed/api/like";
import { createPost } from "@features/feed/api/post";
import type { PostWithComments } from "@features/feed/model/tables";

export function usePosts() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  const addPost = useCallback(async (content: string, image_url?: string) => {
    try {
      const newPost = await createPost(content, image_url);
      if (newPost) {
        // PostWithComments 형태로 변환
        const postWithComments: PostWithComments = {
          id: newPost.id,
          author: {
            id: newPost.author.id,
            username: newPost.author.username,
            display_name: newPost.author.display_name || "",
            avatar: newPost.author.avatar,
          },
          content: newPost.content,
          image_url: newPost.image_url,
          createdAt: newPost.createdAt.toISOString(),
          likes: 0,
          liked: false,
          comments: [],
        };
        setPosts((prev) => [postWithComments, ...(prev ?? [])]);
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    }
  }, []);

  const toggleLike = useCallback(
    async (postId: string) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const wasLiked = post.liked;

      // 낙관적 업데이트 (UI 먼저 업데이트)
      setPosts((prev = []) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                liked: !p.liked,
                likes: p.likes + (p.liked ? -1 : 1),
              }
            : p,
        ),
      );

      try {
        let success = false;
        success = await (wasLiked ? removeLike(postId) : addLike(postId));

        // API 호출 실패 시 원래 상태로 되돌리기
        if (!success) {
          setPosts((prev = []) =>
            prev.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    liked: wasLiked,
                    likes: p.likes + (wasLiked ? 1 : -1),
                  }
                : p,
            ),
          );
          console.error("좋아요 상태 변경 실패");
        }
      } catch (error) {
        // 에러 발생 시 원래 상태로 되돌리기
        setPosts((prev = []) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  liked: wasLiked,
                  likes: p.likes + (wasLiked ? 1 : -1),
                }
              : p,
          ),
        );
        console.error("좋아요 상태 변경 중 오류:", error);
      }
    },
    [posts],
  );

  const addComment = useCallback(async (postId: string, text: string) => {
    try {
      const newComment = await createComment(postId, text);
      if (newComment) {
        setPosts((prev = []) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  comments: [
                    ...(p.comments ?? []),
                    {
                      id: newComment.id,
                      post_id: postId,
                      author: {
                        id: newComment.author.id,
                        username: newComment.author.username,
                        display_name: newComment.author.display_name || "",
                        avatar: newComment.author.avatar,
                      },
                      content: newComment.content,
                      createdAt: newComment.createdAt.toISOString(),
                    },
                  ],
                }
              : p,
          ),
        );
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  }, []);

  return { posts, setPosts, addPost, toggleLike, addComment };
}
