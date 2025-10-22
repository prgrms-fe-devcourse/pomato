import type { Tables, Database } from "@type/database.types";

export type DmConversationTable = Tables<"dm_conversations">;

export type DmConversationFunction =
  Database["public"]["Functions"]["get_or_create_dm_conversation"];

export const DmConversationChannel = "postgre_dm_conversations" as const;
