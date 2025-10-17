import { useCallback, useState } from "react";

import type { Post } from "@features/feed/model/PostProps";

export function usePosts(initial: Post[]) {
  const [posts, setPosts] = useState<Post[]>(initial);

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
                  author: { name: "테스터" },
                  text,
                  createdAt: new Date(),
                },
              ],
            }
          : p,
      ),
    );
  }, []);

  return { posts, toggleLike, addComment };
}
