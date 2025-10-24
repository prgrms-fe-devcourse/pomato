import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createComment } from "@features/feed/api/comment";
import { uploadPostImage } from "@features/feed/api/image";
import { toggleLike } from "@features/feed/api/like";
import { createPost, deletePost, updatePost } from "@features/feed/api/post";
import type { PostWithComments } from "@features/feed/types/feed.types";
import supabase from "@utils/supabase";

interface FeedState {
  // 데이터 상태
  posts: PostWithComments[];
  isLoading: boolean;
  isUploading: boolean;
  likingPosts: Set<string>;
  queryClient: QueryClient | null;

  // 액션들
  addPost: (content: string, imageFile?: File) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
  removePost: (postId: string) => Promise<void>;
  editPost: (postId: string, content: string, imageFile?: File) => Promise<boolean>;
  setPosts: (posts: PostWithComments[]) => void;
  setQueryClient: (queryClient: QueryClient) => void;
}

export const useFeedStore = create<FeedState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      posts: [],
      isLoading: false,
      isUploading: false,
      likingPosts: new Set(),
      queryClient: null,

      // QueryClient 설정
      setQueryClient: (queryClient: QueryClient) => {
        set({ queryClient });
      },

      // 게시글 작성
      addPost: async (content: string, imageFile?: File) => {
        set({ isUploading: true });
        try {
          const newPost = await createPost(content);
          if (!newPost) {
            set({ isUploading: false });
            return;
          }

          let finalImageUrl: string | undefined;

          if (imageFile) {
            const imageUrl = await uploadPostImage(imageFile, newPost.id);
            if (imageUrl) {
              const { data: auth } = await supabase.auth.getUser();
              const userId = auth?.user?.id;

              if (!userId) {
                set({ isUploading: false });
                await deletePost(newPost.id); // 업로드 실패 시 등록된 게시글 삭제
                return;
              }
              const { data: updateData, error: updateError } = await supabase
                .from("posts")
                .update({ image_url: imageUrl })
                .eq("id", newPost.id)
                .eq("user_id", userId)
                .select("image_url");

              if (!updateError && updateData && updateData.length > 0) {
                finalImageUrl = imageUrl;
              }
            }
          }

          const postWithComments: PostWithComments = {
            id: newPost.id,
            author: {
              id: newPost.author.id,
              user_id: newPost.author.user_id,
              username: newPost.author.username,
              display_name: newPost.author.display_name || "",
              avatar_url: newPost.author.avatar_url,
            },
            content: newPost.content,
            image_url: finalImageUrl,
            created_at: newPost.created_at,
            likes_count: 0,
            comments_count: 0,
            likes: 0,
            liked: false,
            comments: [],
          };

          set((state) => ({
            posts: [postWithComments, ...state.posts],
          }));

          // TanStack Query 캐시 무효화
          const { queryClient } = get();
          if (queryClient) {
            void queryClient.invalidateQueries({ queryKey: ["posts"] });
          }
        } catch (error) {
          console.error("게시글 작성 실패:", error);
        } finally {
          set({ isUploading: false });
        }
      },

      // 좋아요 토글
      toggleLike: async (postId: string) => {
        const { posts, likingPosts } = get();
        const post = posts.find((p) => p.id === postId);
        if (!post) return;

        // 이미 처리 중인 게시글인 경우 중복 처리 방지
        if (likingPosts.has(postId)) return;

        const wasLiked = post.liked;

        // 로딩 상태 추가
        set((state) => ({
          likingPosts: new Set(state.likingPosts).add(postId),
        }));

        try {
          const isLiked = await toggleLike(postId);

          // isLiked가 true면 좋아요 추가됨, false면 좋아요 취소됨
          set((state) => ({
            posts: state.posts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    liked: isLiked,
                    likes: isLiked ? p.likes + 1 : p.likes - 1,
                  }
                : p,
            ),
          }));
        } catch (error) {
          // 에러 발생 시 원래 상태로 되돌리기
          set((state) => ({
            posts: state.posts.map((p) =>
              p.id === postId
                ? {
                    ...p,
                    liked: wasLiked,
                    likes: p.likes + (wasLiked ? 1 : -1),
                  }
                : p,
            ),
          }));
          console.error("좋아요 상태 변경 중 오류:", error);
        } finally {
          // 로딩 상태 제거
          set((state) => {
            const newSet = new Set(state.likingPosts);
            newSet.delete(postId);
            return { likingPosts: newSet };
          });
        }
      },

      // 댓글 추가
      addComment: async (postId: string, text: string) => {
        try {
          const newComment = await createComment(postId, text);
          if (newComment) {
            set((state) => ({
              posts: state.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      comments: [
                        ...(p.comments ?? []),
                        {
                          id: newComment.id,
                          post_id: postId,
                          author: {
                            id: newComment.author.id,
                            user_id: newComment.author.user_id,
                            username: newComment.author.username,
                            display_name: newComment.author.display_name || "",
                            avatar_url: newComment.author.avatar_url,
                          },
                          content: newComment.content,
                          created_at: newComment.created_at,
                        },
                      ],
                    }
                  : p,
              ),
            }));
          }
        } catch (error) {
          console.error("댓글 작성 실패:", error);
        }
      },

      // 게시글 삭제
      removePost: async (postId: string) => {
        try {
          const result = await deletePost(postId);
          if (result) {
            set((state) => ({
              posts: state.posts.filter((p) => p.id !== postId),
            }));

            // TanStack Query 캐시 무효화
            const { queryClient } = get();
            if (queryClient) {
              void queryClient.invalidateQueries({ queryKey: ["posts"] });
            }
          }
        } catch (error) {
          console.error("게시글 삭제 중 오류:", error);
        }
      },

      // 게시글 수정
      editPost: async (postId: string, content: string, imageFile?: File) => {
        try {
          let finalImageUrl: string | undefined;

          if (imageFile) {
            const imageUrl = await uploadPostImage(imageFile, postId);
            if (imageUrl) {
              finalImageUrl = imageUrl;
            }
          }

          const updatedPost = await updatePost(postId, content, finalImageUrl);
          if (updatedPost) {
            set((state) => ({
              posts: state.posts.map((p) =>
                p.id === postId
                  ? {
                      ...p,
                      content: updatedPost.content,
                      image_url: updatedPost.image_url,
                    }
                  : p,
              ),
            }));

            // TanStack Query 캐시 무효화
            const { queryClient } = get();
            if (queryClient) {
              void queryClient.invalidateQueries({ queryKey: ["posts"] });
            }
            return true;
          }
          return false;
        } catch (error) {
          console.error("게시글 수정 중 오류:", error);
          return false;
        }
      },

      // 게시글 목록 설정 (외부에서 직접 설정할 때 사용)
      setPosts: (posts: PostWithComments[]) => {
        set({ posts });
      },
    }),
    {
      name: "feed-store", // devtools에서 보여질 이름
    },
  ),
);
