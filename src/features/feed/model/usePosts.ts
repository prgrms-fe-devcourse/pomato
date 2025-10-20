import { useCallback, useState } from "react";

import type { PostWithComments } from "@features/feed/model/tables";

export function usePosts() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);

  const addPost = useCallback((newPost: PostWithComments) => {
    setPosts((prev) => [newPost, ...(prev ?? [])]);
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

  const addComment = useCallback((postId: string, text: string) => {
    setPosts((prev = []) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...(p.comments ?? []),
                {
                  id: crypto.randomUUID(),
                  post_id: postId,
                  author: {
                    username: "테스터",
                    display_name: "테스터",
                    id: crypto.randomUUID(),
                  },
                  content: text,
                  createdAt: new Date().toISOString(), // <- Fix: store as string
                },
              ],
            }
          : p,
      ),
    );
  }, []);

  return { posts, setPosts, addPost, toggleLike, addComment };
}
