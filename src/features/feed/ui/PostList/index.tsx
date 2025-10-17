import type { Post } from "@features/feed/model/PostProps";
import PostCard from "@features/feed/ui/PostCard";

type PostListProps = {
  posts: Post[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
};

export default function PostList({ posts, onToggleLike, onAddComment }: PostListProps) {
  return (
    <section className="flex flex-col gap-3">
      {posts.map((p) => (
        <PostCard
          key={p.id}
          id={p.id}
          author={p.author}
          text={p.text}
          imageUrl={p.imageUrl}
          likes={p.likes}
          liked={p.liked}
          comments={p.comments}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
        />
      ))}
    </section>
  );
}
