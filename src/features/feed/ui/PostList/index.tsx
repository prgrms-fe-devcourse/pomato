import type { PostWithComments } from "@features/feed/model/tables";
import PostCard from "@features/feed/ui/PostCard";

type PostListProps = {
  posts: PostWithComments[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
};

export default function PostList({ posts, onToggleLike, onAddComment }: PostListProps) {
  console.log("여기 뭔데?", posts[0]);
  return (
    <section className="flex flex-col gap-3">
      {posts.map((p) => (
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
      ))}
    </section>
  );
}
