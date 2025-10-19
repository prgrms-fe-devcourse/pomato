import type { Tables } from "@type/database.types";
import supabase from "@utils/supabase";

type DmConversationFunction =
  //Database["public"]["Functions"]["get_or_create_dm_conversation"]
  {
    Args: {
      _user_a: string;
      _user_b: string;
    };
    Returns: string;
  };

export const getChatRoomIdByUser = async ({
  _user_a: userAId,
  _user_b: userBId,
}: DmConversationFunction["Args"]): Promise<DmConversationFunction["Returns"]> => {
  const { data, error } = await supabase.rpc<
    "get_or_create_dm_conversation",
    DmConversationFunction
  >("get_or_create_dm_conversation", {
    _user_a: userAId,
    _user_b: userBId,
  });

  if (error) throw error;

  return data;
};

type DmConversationTable = Tables<"dm_conversations">;

export const getMyChatRoomIds = async (): Promise<DmConversationTable[]> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { data, error: dataError } = await supabase
    .from("dm_conversations")
    .select<"*", DmConversationTable>("*")
    .or(`user_a.eq.${user?.id},user.b.eq.${user?.id}`);

  if (dataError) throw dataError;
  return data;
};
