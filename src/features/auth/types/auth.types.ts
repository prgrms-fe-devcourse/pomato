import type { Database, Tables } from "@type/database.types";

export type OAuthProviders = "google" | "github" | "kakao";

export type ProfileRow = Tables<"profiles">;

type DataProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type Profile = Pick<DataProfile, "user_id" | "display_name" | "username" | "avatar_url">;
