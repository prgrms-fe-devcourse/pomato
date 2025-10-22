import type { RealtimeChannel } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef } from "react";

import type { DmMessagesTable } from "@features/dm/types/messages.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

export const useRoomChannel = (conversationId: string) => {
  const { addChannel, started } = useRealtimeHandler();
  const channelRef = useRef<RealtimeChannel | null>(null);

  const subscribeToMessages = useCallback(
    (onMessage: (message: DmMessagesTable["Row"]) => void) => {
      if (!channelRef.current) return;

      channelRef.current.on("broadcast", { event: "message" }, (payload) => {
        onMessage(payload.payload as DmMessagesTable["Row"]);
      });
    },
    [],
  );

  const sendMessages = useCallback(async (message: DmMessagesTable["Row"]) => {
    if (!channelRef.current) return;
    await channelRef.current.send({
      type: "broadcast",
      event: "message",
      payload: message,
    });
  }, []);

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
      channelRef.current = channel;
      return channel;
    });

    return () => {
      removeChannel();
      channelRef.current = null;
    };
  }, [started, addChannel, conversationId]);

  return {
    subscribeToMessages,
    sendMessages,
  };
};
