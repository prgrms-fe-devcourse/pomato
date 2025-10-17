import { dummyPosts } from "@features/feed/model/PostProps";
import { usePosts } from "@features/feed/model/usePosts";
import PostCard from "@features/feed/ui/PostCard";

export default function PostList() {
  const { posts, toggleLike, addComment } = usePosts(dummyPosts);

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
          onToggleLike={toggleLike}
          onAddComment={addComment}
        />
      ))}
    </section>
  );
}
