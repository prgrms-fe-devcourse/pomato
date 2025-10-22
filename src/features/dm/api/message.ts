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
