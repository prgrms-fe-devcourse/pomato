import { Search } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData } from "react-router";

import Input from "@components/Input";
import { dummyPosts } from "@features/feed/model/PostProps";
import type { PostRow } from "@features/feed/model/tables";
import { usePosts } from "@features/feed/model/usePosts";
import FeedHeader from "@features/feed/ui/FeedHeader";
import PostList from "@features/feed/ui/PostList";

export default function Feed() {
  const { posts, addPost, toggleLike, addComment } = usePosts(dummyPosts);

  const post_data = useLoaderData<PostRow[]>();

  useEffect(() => {
    if (post_data) console.log("데이터 출력", post_data);
  }, [post_data]);

  return (
    <div className="flex h-screen flex-col gap-[12px] p-[16px] select-none">
      {/* 글쓰기 영역 + 구분선*/}
      <FeedHeader onCreatePost={addPost} />

      {/* 검색창 영역 */}
      <Input Icon={{ Component: Search, align: "right" }} placeholder="검색어를 입력하세요..." />

      {/* Post List 영역 */}
      <div className="pc-scroll min-h-0 flex-1 overflow-y-auto">
        <PostList posts={posts} onToggleLike={toggleLike} onAddComment={addComment} />
      </div>
    </div>
  );
}
