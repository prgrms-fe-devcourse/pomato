import type { Database } from "@type/database.types";

export type PostRow = Database["public"]["Tables"]["posts"]["Row"];
export type CommentRow = Database["public"]["Tables"]["post_comments"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
