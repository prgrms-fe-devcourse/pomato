import type { Provider } from "@supabase/supabase-js";

import type { Tables } from "@type/database.types";

export type OAuthProvider = Extract<Provider, "google" | "github" | "kakao">;

export type ProfileRow = Tables<"profiles">;

export type Profile = Pick<
  ProfileRow,
  "user_id" | "display_name" | "username" | "avatar_url" | "bio"
>;
