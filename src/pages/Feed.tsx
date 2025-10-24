import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Search, SearchX, FileText, Heart } from "lucide-react";
import { useMemo, useState, useEffect, useRef } from "react";

import EmptyState from "@components/Empty";
import Input from "@components/Input";
import { getPostList } from "@features/feed/api/post";
import { useFeedStore } from "@features/feed/store/feedStore";
import FeedHeader from "@features/feed/ui/FeedHeader";
import PostList from "@features/feed/ui/PostList";
import { useUserId, useIsLoggedIn } from "@stores/useAuthStore";
import ClassicBarSpinner from "@utils/classicBarSpinner";

export default function Feed() {
  const {
    posts: storePosts,
    isUploading,
    likingPosts,
    addPost,
    toggleLike,
    addComment,
    removePost,
    editPost,
    setQueryClient,
  } = useFeedStore();
  const [query, setQuery] = useState("");
  const userId = useUserId();
  const queryClient = useQueryClient();

  // QueryClient를 스토어에 주입
  useEffect(() => {
    setQueryClient(queryClient);
  }, [queryClient, setQueryClient]);

  // 로그인 상태 확인
  const isLoggedIn = useIsLoggedIn();

  // 이전 데이터 상태를 추적하기 위한 ref
  const prevDataRef = useRef<string[][] | null>(null);

  // useInfiniteQuery를 사용한 무한 스크롤
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => {
      return getPostList(pageParam, 5); // 5개만 렌더링 되도록 설정
    },
    getNextPageParam: (lastPage) => {
      // hasNextPage가 false이면 undefined를 반환하여 더 이상 로드하지 않음
      return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
    },
    initialPageParam: 0,
    // 한 번에 하나의 페이지만 로드하도록 설정
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // TanStack Query 데이터를 스토어와 동기화
  useEffect(() => {
    if (!data || data.pages.length === 0) return;

    const currentDataString = JSON.stringify(data.pages.map((page) => page.posts.map((p) => p.id)));
    const prevDataString = prevDataRef.current ? JSON.stringify(prevDataRef.current) : null;

    // 데이터가 변경되었을 때만 동기화
    if (currentDataString !== prevDataString) {
      const queryPosts = data.pages.flatMap((page) =>
        page.posts.map((post) => ({
          ...post,
          liked: post.liked ?? false,
          comments: post.comments ?? [],
        })),
      );

      const { setPosts, posts: currentStorePosts } = useFeedStore.getState();

      // 초기 로드이거나 스토어가 비어있을 때
      if (currentStorePosts.length === 0) {
        setPosts(queryPosts);
      } else {
        // 기존 데이터와 새 데이터 병합 (중복 제거)
        const existingIds = new Set(currentStorePosts.map((p) => p.id));
        const newPosts = queryPosts.filter((p) => !existingIds.has(p.id));

        if (newPosts.length > 0) {
          setPosts([...currentStorePosts, ...newPosts]);
        }
      }

      prevDataRef.current = data.pages.map((page) => page.posts.map((p) => p.id));
    }
  }, [data]);

  // 게시글 데이터 결정: 스토어에 데이터가 있으면 스토어 우선, 없으면 쿼리 데이터 사용
  const posts = useMemo(() => {
    if (storePosts.length > 0) {
      return storePosts;
    }

    if (data?.pages) {
      return data.pages.flatMap((page) =>
        page.posts.map((post) => ({
          ...post,
          liked: post.liked ?? false,
          comments: post.comments ?? [],
        })),
      );
    }

    return [];
  }, [storePosts, data]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.content.toLowerCase().includes(q));
  }, [posts, query]);

  // 스크롤 기반 무한 스크롤
  useEffect(() => {
    const scrollContainer = document.querySelector(".pc-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;

      if (isNearBottom && hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-[12px] overflow-hidden p-[16px] select-none">
      {isLoggedIn ? (
        // 글쓰기 영역 + 구분선
        <FeedHeader
          onCreatePost={(content, imageFile) => {
            void addPost(content, imageFile);
          }}
          isUploading={isUploading}
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
          placeholder="게시글 내용에서 검색할 키워드를 입력하세요..."
        />
      )}

      {/* Post List 영역 */}
      <div className="pc-scroll min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          // Spinner 효과
          <div className="flex h-full items-center justify-center py-4 text-center">
            <ClassicBarSpinner />
          </div>
        ) : posts.length === 0 ? (
          // 피드가 비어 있는 경우
          <EmptyState
            title="게시물이 없습니다"
            description="아직 작성된 게시물이 없습니다"
            Icon={FileText}
          />
        ) : filteredPosts.length > 0 ? (
          // 피드가 있는 경우
          <>
            <PostList
              posts={filteredPosts}
              onToggleLike={(id) => {
                if (!isLoggedIn) return;
                void toggleLike(id);
              }}
              likingPosts={likingPosts}
              onAddComment={(id, text) => {
                if (!isLoggedIn) return;
                void addComment(id, text);
              }}
              onDelete={(id) => {
                if (!isLoggedIn) return;
                void removePost(id);
              }}
              onEdit={async (id, content, imageFile) => {
                if (!isLoggedIn) return;
                await editPost(id, content, imageFile);
              }}
              currentUserId={userId}
            />

            {/* 무한 스크롤 로딩 인디케이터 */}
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <ClassicBarSpinner />
              </div>
            )}
          </>
        ) : (
          // 검색 결과가 없는 경우
          <EmptyState
            title="검색 결과가 없습니다"
            description="다른 키워드로 다시 검색해보세요"
            Icon={SearchX}
          />
        )}
      </div>
    </section>
  );
}
