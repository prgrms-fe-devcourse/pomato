import { getMessages, getUnreadMessages, markMessageAsRead } from "@features/dm/api/message";
import type {
  DmConversationFunction,
  DmConversationTable,
} from "@features/dm/types/conversation.type";
import type { DmMessagesTable } from "@features/dm/types/messages.type";
import supabase from "@utils/supabase";

export const getChatRoomIdByUser = async (
  userA: string,
  userB: string,
): Promise<DmConversationFunction["Returns"]> => {
  const rpcResult = await supabase.rpc<
    "get_or_create_dm_conversation",
    DmConversationFunction["Args"]
  >("get_or_create_dm_conversation", {
    _user_a: userA,
    _user_b: userB,
  });

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

export const setMyChatRooms = async (
  setRooms: (
    rooms: (DmConversationTable & {
      message: string;
      unreadCount: number;
      lastMessageTime: string;
    })[],
  ) => void,
) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) return;

  const { data: rooms, error: dataError } = await supabase
    .from("dm_conversations")
    .select<"*", DmConversationTable>("*")
    .or(`user_a.eq.${user.id},user_b.eq.${user.id}`);

  if (dataError || !rooms) return;

  const enrichedRooms = await Promise.all(
    rooms.map(async (room) => {
      const { data: lastMsg } = await supabase
        .from("dm_messages")
        .select<"*", DmMessagesTable["Row"]>("*")
        .eq("conversation_id", room.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const unreadMessages = await getUnreadMessages(room.id);
      const unreadCount = unreadMessages.length;

      const lastUnreadMessage = unreadMessages[0] ?? null;
      const lastMessageTime = lastUnreadMessage?.created_at ?? "";

      return {
        ...room,
        message: lastMsg?.content ?? "",
        unreadCount,
        lastMessageTime,
      };
    }),
  );

  setRooms(enrichedRooms);
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

export const enterRooms = async (conversationId: string) => {
  const message = await getMessages(conversationId);
  const lastMessage = message.at(-1);

  if (lastMessage) {
    await markMessageAsRead(conversationId, lastMessage.id);
  }
};
