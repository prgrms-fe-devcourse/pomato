import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

import { insertMessage } from "@features/dm/api/message";
import type { DmMessagesTable } from "@features/dm/types/messages.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

export const useRoomChannel = (
  conversationId: string,
  onMessage: (message: DmMessagesTable["Row"]) => void,
) => {
  const { addChannel, started } = useRealtimeHandler();
  const channelRef = useRef<RealtimeChannel | null>(null);

  const sendMessages = async (payload: DmMessagesTable["Insert"]) => {
    if (!channelRef.current) return;

    const message = await insertMessage(payload);

    if (!message) console.error("Failed to insert message:");

    await channelRef.current.send({
      type: "broadcast",
      event: "message",
      payload: message,
    });
  };

  useEffect(() => {
    if (!started) return;
    const removeChannel = addChannel((supabaseClient) => {
      const channel = supabaseClient.channel(conversationId, {
        config: {
          broadcast: {
            self: true,
            ack: true,
          },
        },
      });

      if (!channel.bindings.broadcast) {
        channel.on("broadcast", { event: "message" }, (payload) => {
          const data = payload.payload as DmMessagesTable["Row"];
          onMessage(data);
        });
      }

      channelRef.current = channel;
      return channel;
    });

    return () => {
      removeChannel();
      channelRef.current = null;
    };
  }, [started, addChannel, conversationId, onMessage]);

  return {
    sendMessages,
  };
};
