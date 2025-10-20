import type {
  DmConversationFunction,
  DmConversationTable,
} from "@features/dm/types/conversation.type";
import supabase from "@utils/supabase";

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

export type GetMyChatRoomIdsReturn = {
  isLogin: boolean;
  rooms: DmConversationTable[];
};

export const getMyChatRoomIds = async (): Promise<GetMyChatRoomIdsReturn> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) return { isLogin: false, rooms: [] };
  const { data, error: dataError } = await supabase
    .from("dm_conversations")
    .select<"*", DmConversationTable>("*")
    .or(`user_a.eq.${user?.id},user_b.eq.${user?.id}`);
  if (dataError) throw dataError;
  return { isLogin: true, rooms: data };
};
