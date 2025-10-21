import { useCallback, useState } from "react";

import { createComment } from "@features/feed/api/comment";
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

  const toggleLike = useCallback((postId: string) => {
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
  }, []);

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
