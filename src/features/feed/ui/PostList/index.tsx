import { memo, useMemo } from "react";

import type { PostWithComments } from "@features/feed/model/tables";
import PostCard from "@features/feed/ui/PostCard";

type PostListProps = {
  posts: PostWithComments[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
};

function PostList({ posts, onToggleLike, onAddComment }: PostListProps) {
  const items = useMemo(
    () =>
      posts.map((p) => (
        <PostCard
          key={p.id}
          id={p.id}
          author={{
            id: p.author.id,
            username: p.author.username,
            display_name: p.author.display_name,
            avatar: p.author.avatar_url || undefined,
          }}
          content={p.content}
          image_url={p.image_url}
          createdAt={new Date(p.createdAt)}
          likes={p.likes}
          liked={p.liked}
          comments={p.comments}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
        />
      )),
    [posts, onToggleLike, onAddComment],
  );

  return <section className="flex flex-col gap-3">{items}</section>;
}

export default memo(PostList);
