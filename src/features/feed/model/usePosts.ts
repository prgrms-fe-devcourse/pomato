import { useCallback, useState } from "react";

import type { Post } from "@features/feed/types/post.type";

export function usePosts(initial: Post[]) {
  const [posts, setPosts] = useState<Post[]>(initial);

  const addPost = useCallback((newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
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
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: crypto.randomUUID(),
                  post_id: postId,
                  author: { username: "테스터", display_name: "테스터", id: crypto.randomUUID() },
                  content: text,
                  createdAt: new Date(),
                },
              ],
            }
          : p,
      ),
    );
  }, []);

  return { posts, addPost, toggleLike, addComment };
}
