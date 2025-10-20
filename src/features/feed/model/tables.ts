import type { Database } from "@type/database.types";

export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type CommentRow = Database["public"]["Tables"]["post_comments"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

// API 응답 타입 확장
export type CommentWithAuthor = {
  id: string;
  post_id: string;
  author: {
    id: string;
    username: string;
    display_name: string;
    avatar_url?: string;
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
    avatar_url?: string;
  };
  content: string;
  image_url?: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: CommentWithAuthor[];
};
