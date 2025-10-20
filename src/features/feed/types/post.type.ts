import type { Database } from "@type/database.types";

export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"]; // INSERT 시
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"]; // UPDATE 시

// features/feed/model/domain.ts
export type Author = {
  id: string;
  username: string; // display_name || username
  display_name?: string;
  avatar?: string;
};

export type Comment = {
  id: string;
  post_id: string;
  author: Author;
  content: string;
  createdAt: Date; // timestamptz -> Date
};

export type Post = {
  id: string;
  author: Author;
  content: string;
  image_url?: string;
  createdAt: Date; // timestamptz -> Date
  likes: number;
  liked?: boolean;
  comments: Comment[];
};
