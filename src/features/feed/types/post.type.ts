import type { Database } from "@type/database.types";

export type PostTable = Database["public"]["Tables"]["posts"]; // POST 테이블 데이터 조회

export type PostRow = Database["public"]["Tables"]["posts"]["Row"]; // SELECT 시
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"]; // INSERT 시
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"]; // UPDATE 시
