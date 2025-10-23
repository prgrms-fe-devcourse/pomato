import type { Database } from "../../../types/database.types";

// Database에서 직접 가져오는 기본 타입들
export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export type CommentRow = Database["public"]["Tables"]["post_comments"]["Row"];
export type CommentInsert = Database["public"]["Tables"]["post_comments"]["Insert"];
export type CommentUpdate = Database["public"]["Tables"]["post_comments"]["Update"];

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export type LikeRow = Database["public"]["Tables"]["post_likes"]["Row"];
export type LikeInsert = Database["public"]["Tables"]["post_likes"]["Insert"];

export type Author = Pick<ProfileRow, "user_id" | "username" | "display_name" | "avatar_url"> & {
  id: string; // user_id를 id로 매핑
};

export type Comment = Pick<CommentRow, "id" | "post_id" | "content" | "created_at"> & {
  author: Author;
};

export type Post = Pick<
  PostRow,
  "id" | "content" | "created_at" | "likes_count" | "comments_count"
> & {
  image_url?: string | null;
  author: Author;
  likes: number;
  liked?: boolean;
  comments: Comment[];
};

// API 응답용 타입들 (문자열 날짜 형식)
export type CommentWithAuthor = Pick<CommentRow, "id" | "post_id" | "content" | "created_at"> & {
  author: Author;
};

export type PostWithComments = Pick<
  PostRow,
  "id" | "content" | "created_at" | "likes_count" | "comments_count"
> & {
  image_url?: string | null;
  author: Author;
  likes: number;
  liked: boolean;
  comments: CommentWithAuthor[];
};

// 유틸리티 타입들
export type PostWithAuthor = Pick<PostRow, "id" | "content" | "image_url" | "created_at"> & {
  author: Author;
};

export type CommentWithAuthorProfile = Pick<
  CommentRow,
  "id" | "post_id" | "content" | "created_at"
> & {
  author: Author;
};
