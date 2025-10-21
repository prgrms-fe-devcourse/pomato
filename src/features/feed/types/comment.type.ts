import type { Database } from "@type/database.types";

export type CommentTable = Database["public"]["Tables"]["post_comments"];

export type CommentRow = Database["public"]["Tables"]["post_comments"]["Row"]; // SELECT 시
export type CommentInsert = Database["public"]["Tables"]["post_comments"]["Insert"]; // INSERT 시
export type CommentUpdate = Database["public"]["Tables"]["post_comments"]["Update"]; // UPDATE 시
