import type { Database } from "@type/database.types";

// Database 테이블 타입들
export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type CommentRow = Database["public"]["Tables"]["post_comments"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

// Database Insert/Update 타입들
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
export type CommentInsert = Database["public"]["Tables"]["post_comments"]["Insert"];
export type CommentUpdate = Database["public"]["Tables"]["post_comments"]["Update"];

// 도메인 타입들
export type Author = {
  id: string;
  username: string;
  display_name?: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author: Author;
  content: string;
  createdAt: Date;
};

export type Post = {
  id: string;
  author: Author;
  content: string;
  image_url?: string;
  createdAt: Date;
  likes: number;
  liked?: boolean;
  comments: Comment[];
};

// API 응답 타입들 (문자열 날짜 형식)
export type CommentWithAuthor = {
  id: string;
  post_id: string;
  author: {
    id: string;
    username: string;
    display_name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
};

export type PostWithComments = {
  id: string;
  author: {
    id: string;
    username: string;
    display_name: string;
    avatar?: string;
  };
  content: string;
  image_url?: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: CommentWithAuthor[];
};
