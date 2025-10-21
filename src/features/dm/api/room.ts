import type {
  DmConversationFunction,
  DmConversationTable,
} from "@features/dm/types/conversation.type";
import supabase from "@utils/supabase";

export const getChatRoomIdByUser = async (
  userA: string,
  userB: string,
): Promise<DmConversationFunction["Returns"]> => {
  const rpcResult = await supabase.rpc<"get_or_create_dm_conversation", DmConversationFunction>(
    "get_or_create_dm_conversation",
    {
      _user_a: userA,
      _user_b: userB,
    },
  );

  if ("error" in rpcResult && rpcResult.error) throw rpcResult.error;

  return rpcResult.data ?? null;
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

export const getRoomInfoById = async (id: string): Promise<DmConversationTable | null> => {
  const { data, error } = await supabase
    .from("dm_conversations")
    .select<"*", DmConversationTable>("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch room info:", error.message);
    return null;
  }

  return data;
};
