import { Search, SearchX, FileText, Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";

import EmptyState from "@components/Empty";
import Input from "@components/Input";
import type { PostWithComments } from "@features/feed/model/tables";
import { usePosts } from "@features/feed/model/usePosts";
import FeedHeader from "@features/feed/ui/FeedHeader";
import PostList from "@features/feed/ui/PostList";
import supabase from "@utils/supabase";

export default function Feed() {
  const { posts, setPosts, addPost, toggleLike, addComment } = usePosts();
  const [query, setQuery] = useState("");

  const post_data = useLoaderData<PostWithComments[]>();

  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    // 로그인 체크 여부
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (data) setIsLogin(!!data.user);
    })();
  }, []);

  useEffect(() => {
    if (post_data) {
      setPosts(post_data);
      // setPosts([]); // Empty 테스트
      console.log("데이터 출력", post_data);
    }
  }, [post_data, setPosts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      (p.comments ?? []).some((c) => (c.content ?? "").toLowerCase().includes(q)),
    );
  }, [posts, query]);

  return (
    <div className="flex h-screen flex-col gap-[12px] p-[16px] select-none">
      {isLogin ? (
        // 글쓰기 영역 + 구분선
        <FeedHeader
          onCreatePost={(content, imageUrl) => {
            void addPost(content, imageUrl);
          }}
        />
      ) : (
        <EmptyState
          title="다른 사용자들의 집중 여정을 구경해보세요!"
          description="게시물 작성은 로그인 후 이용 가능합니다"
          Icon={Heart}
          className="h-[8rem] rounded-[12px] p-4"
          iconStyle="h-7 w-7"
        />
      )}

      {/* 검색창 영역 */}
      {posts.length > 0 && (
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          Icon={{ Component: Search, align: "right" }}
          placeholder="댓글에서 검색할 키워드를 입력하세요..."
        />
      )}

      {/* Post List 영역 */}
      <div className="pc-scroll min-h-0 flex-1 overflow-y-auto">
        {posts.length === 0 ? (
          // 피드가 비어 있는 경우
          <EmptyState
            title="게시물이 없습니다"
            description="아직 작성된 게시물이 없습니다"
            Icon={FileText}
          />
        ) : filteredPosts.length > 0 ? (
          // 피드가 있는 경우
          <PostList
            posts={filteredPosts}
            onToggleLike={(id) => {
              void toggleLike(id);
            }}
            onAddComment={(id, text) => {
              void addComment(id, text);
            }}
          />
        ) : (
          // 검색 결과가 없는 경우
          <EmptyState
            title="검색 결과가 없습니다"
            description="다른 키워드로 다시 검색해보세요"
            Icon={SearchX}
          />
        )}
      </div>
    </div>
  );
}
