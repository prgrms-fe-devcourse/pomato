import type { DmMessagesTable } from "@features/dm/types/messages.type";
import supabase from "@utils/supabase";

export const persistMessage = async ({ content, conversation_id }: DmMessagesTable["Insert"]) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { data, error } = await supabase
    .from("dm_messages")
    .insert({
      content,
      conversation_id,
      sender_id: user!.id,
    })
    .select<"*", DmMessagesTable>()
    .single();

  if (error) throw error;
  return data;
};

export const insertMessage = async (
  message: DmMessagesTable["Insert"],
): Promise<DmMessagesTable["Row"] | null> => {
  const { data, error } = await supabase
    .from("dm_messages")
    .insert(message)
    .select<"*", DmMessagesTable["Row"]>("*")
    .single();

  if (error) {
    console.error("Failed to insert message:", error);
    return null;
  }

  return data;
};

export const getMessages = async (conversationId: string): Promise<DmMessagesTable["Row"][]> => {
  const { data, error } = await supabase
    .from("dm_messages")
    .select<"*", DmMessagesTable["Row"]>("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) return [];
  return data;
};

export const fetchMessages = async (
  conversationId: string,
  setMessages: (messages: DmMessagesTable["Row"][]) => void,
) => {
  const { data, error } = await supabase
    .from("dm_messages")
    .select<"*", DmMessagesTable["Row"]>("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) setMessages([]);
  else setMessages(data);
};

export const markMessageAsRead = async (
  conversationId: string,
  messageId: string,
): Promise<void> => {
  const { error } = await supabase.rpc("mark_dm_read", {
    p_conversation_id: conversationId,
    p_message_id: messageId,
  });

  if (error) {
    console.error("읽음 처리 실패:", error.message);
    throw error;
  }
};

export const getUnreadMessages = async (conversationId: string) => {
  const { data, error } = await supabase.rpc("get_unread_messages", {
    p_conversation_id: conversationId,
  });

  if (error) {
    console.error("Failed to fetch unread messages:", error);
    return [];
  }

  return data ?? [];
};
