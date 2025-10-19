import type { Database } from "@type/database.types";
import supabase from "@utils/supabase";

export type DmMessagesTable = Database["public"]["Tables"]["dm_messages"];

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
      sender_id: user?.id,
    })
    .select<"*", DmMessagesTable>()
    .single();

  if (error) throw error;
  return data;
};
