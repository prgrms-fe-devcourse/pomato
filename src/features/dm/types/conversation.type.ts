import type { Tables } from "@type/database.types";

export type DmConversationTable = Tables<"dm_conversations">;

export type DmConversationFunction =
  //Database["public"]["Functions"]["get_or_create_dm_conversation"]
  {
    Args: {
      _user_a: string;
      _user_b: string;
    };
    Returns: string;
  };
