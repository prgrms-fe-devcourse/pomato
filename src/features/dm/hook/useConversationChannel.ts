import { useEffect } from "react";

import { getUnreadMessages } from "@features/dm/api/message";
import { setMyChatRooms } from "@features/dm/api/room";
import { useDmRoomStore } from "@features/dm/store/useRoomStore";
import {
  DmConversationChannel,
  type DmConversationTable,
} from "@features/dm/types/conversation.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

export const useConversationChannel = (userId: string) => {
  const { addChannel, started } = useRealtimeHandler();
  const setRooms = useDmRoomStore((state) => state.setRooms);
  const updateRooms = useDmRoomStore((state) => state.updateRoom);

  useEffect(() => {
    if (!started) return;
    const updateRoomUnreadState = async (conversationId: string) => {
      try {
        const unreadMessages = await getUnreadMessages(conversationId);
        const lastMessage = unreadMessages.at(-1);
        const unreadCount = unreadMessages.length;
        updateRooms(conversationId, {
          message: lastMessage?.content ?? "",
          unreadCount,
          lastMessageTime: lastMessage?.created_at ?? "",
        });
      } catch (error) {
        console.error("읽음 상태 업데이트 실패:", error);
      }
    };

    const removeChannel = addChannel(
      (supabaseClient) => {
        const channel = supabaseClient.channel(DmConversationChannel);

        if (!channel.bindings.postgres_changes) {
          channel.on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "dm_conversations",
              filter: `user_a=eq.${userId}`,
            },
            (payload) => {
              const old = payload.old as DmConversationTable;
              const updated = payload.new as DmConversationTable;

              if (old.last_read_message_id_b !== updated.last_read_message_id_b) {
                void updateRoomUnreadState(updated.id);
              }
            },
          );

          channel.on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "dm_conversations",
              filter: `user_b=eq.${userId}`,
            },
            (payload) => {
              const old = payload.old as DmConversationTable;
              const updated = payload.new as DmConversationTable;

              if (old.last_read_message_id_a !== updated.last_read_message_id_a) {
                void updateRoomUnreadState(updated.id);
              }
            },
          );
        }
        return channel;
      },
      true,
      {
        onSubscribe: () => {
          void setMyChatRooms(setRooms);
        },
      },
    );

    return () => {
      removeChannel();
    };
  }, [addChannel, started, setRooms, userId, updateRooms]);
};
