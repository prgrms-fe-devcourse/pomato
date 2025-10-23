import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { Search, SearchX, FileText, Heart } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

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
  } = useFeedStore();
  const [query, setQuery] = useState("");
  const userId = useUserId();
  const queryClient = useQueryClient();

  // 로그인 상태 확인
  const isLoggedIn = useIsLoggedIn();

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

  // 모든 페이지의 게시글을 하나의 배열로 합치기
  const queryPosts = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page.posts.map((post) => ({
          ...post,
          liked: post.liked ?? false,
          comments: post.comments ?? [],
        })),
      ) ?? []
    );
  }, [data]);

  // Zustand 스토어와 TanStack Query 양방향 동기화
  useEffect(() => {
    if (queryPosts.length > 0) {
      // TanStack Query에서 가져온 데이터를 Zustand 스토어에 동기화
      const { setPosts } = useFeedStore.getState();
      setPosts(queryPosts);
    }
  }, [queryPosts]);

  // Zustand 스토어의 변경사항을 TanStack Query 캐시에 동기화
  useEffect(() => {
    if (storePosts.length > 0 && data) {
      // 변경된 게시글들을 찾아서 캐시 업데이트
      // 업데이트 작업 안할 경우 로컬과 서버 데이터가 불일치하는 현상 있었음
      const updatedPages = data.pages.map((page) => ({
        ...page,
        posts: page.posts.map((cachedPost) => {
          const storePost = storePosts.find((sp) => sp.id === cachedPost.id);
          return storePost ?? cachedPost;
        }),
      }));

      // 캐시 업데이트
      queryClient.setQueryData(["posts"], {
        pageParams: data.pageParams,
        pages: updatedPages,
      });
    }
  }, [storePosts, data, queryClient]);

  // Zustand 스토어의 posts를 우선 사용 (낙관적 업데이트 반영)
  const posts = storePosts.length > 0 ? storePosts : queryPosts;

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
