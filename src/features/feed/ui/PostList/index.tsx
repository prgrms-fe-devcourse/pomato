import { memo, useMemo } from "react";

import type { PostWithComments } from "@features/feed/types/feed.types";
import PostCard from "@features/feed/ui/PostCard";

type PostListProps = {
  posts: PostWithComments[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onDelete?: (postId: string) => void;
  onEdit?: (postId: string, content: string, imageFile?: File) => Promise<void>;
  currentUserId?: string;
};

function PostList({
  posts,
  onToggleLike,
  onAddComment,
  onDelete,
  onEdit,
  currentUserId,
}: PostListProps) {
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
            avatar: p.author.avatar || undefined,
          }}
          content={p.content}
          image_url={p.image_url}
          createdAt={new Date(p.createdAt)}
          likes={p.likes}
          liked={p.liked}
          comments={p.comments}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
          onDelete={onDelete}
          onEdit={onEdit}
          currentUserId={currentUserId}
        />
      )),
    [posts, onToggleLike, onAddComment, onDelete, onEdit, currentUserId],
  );

  return <section className="flex flex-col gap-3">{items}</section>;
}

export default memo(PostList);
