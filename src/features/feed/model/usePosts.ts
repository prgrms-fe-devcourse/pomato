import { useCallback, useState } from "react";

import { createComment } from "@features/feed/api/comment";
import { uploadPostImage } from "@features/feed/api/image";
import { toggleLike } from "@features/feed/api/like";
import { createPost, deletePost, updatePost } from "@features/feed/api/post";
import type { PostWithComments } from "@features/feed/types/feed.types";
import supabase from "@utils/supabase";

export function usePosts() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set());

  const addPost = useCallback(async (content: string, imageFile?: File) => {
    setIsUploading(true);
    try {
      const newPost = await createPost(content);
      if (!newPost) {
        setIsUploading(false);
        return;
      }

      let finalImageUrl: string | undefined;

      if (imageFile) {
        const imageUrl = await uploadPostImage(imageFile, newPost.id);
        if (imageUrl) {
          const { data: auth } = await supabase.auth.getUser();
          const userId = auth?.user?.id;

          if (!userId) {
            setIsUploading(false);
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
      setPosts((prev) => [postWithComments, ...(prev ?? [])]);
    } catch (error) {
      console.error("게시글 작성 실패:", error);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const toggleLikeHandler = useCallback(
    async (postId: string) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      // 이미 처리 중인 게시글인 경우 중복 처리 방지
      if (likingPosts.has(postId)) return;

      const wasLiked = post.liked;

      // 로딩 상태 추가 (낙관적 업데이트)
      setLikingPosts((prev) => new Set(prev).add(postId));

      try {
        const isLiked = await toggleLike(postId);

        // isLiked가 true면 좋아요 추가됨, false면 좋아요 취소됨
        setPosts((prev = []) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  liked: isLiked,
                  likes: isLiked ? p.likes + 1 : p.likes - 1,
                }
              : p,
          ),
        );
      } catch (error) {
        // 에러 발생 시 원래 상태로 되돌리기
        setPosts((prev = []) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  liked: wasLiked,
                  likes: p.likes + (wasLiked ? 1 : -1),
                }
              : p,
          ),
        );
        console.error("좋아요 상태 변경 중 오류:", error);
      } finally {
        // 로딩 상태 제거
        setLikingPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
    },
    [posts, likingPosts],
  );

  const addComment = useCallback(async (postId: string, text: string) => {
    try {
      const newComment = await createComment(postId, text);
      if (newComment) {
        setPosts((prev = []) =>
          prev.map((p) =>
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
        );
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  }, []);

  const removePost = useCallback(async (postId: string) => {
    try {
      const result = await deletePost(postId);
      if (result) {
        setPosts((prev = []) => prev.filter((p) => p.id !== postId));
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
    }
  }, []);

  const editPost = useCallback(async (postId: string, content: string, imageFile?: File) => {
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
        setPosts((prev = []) =>
          prev.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  content: updatedPost.content,
                  image_url: updatedPost.image_url,
                }
              : p,
          ),
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("게시글 수정 중 오류:", error);
      return false;
    }
  }, []);

  return {
    posts,
    setPosts,
    addPost,
    toggleLike: toggleLikeHandler,
    addComment,
    removePost,
    editPost,
    isUploading,
    likingPosts,
  };
}
