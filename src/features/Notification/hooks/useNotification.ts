import { useEffect } from "react";

import { getNotifications } from "@features/notification/api/notification";
import { useNotificationStore } from "@features/notification/stores/useNotificationStore";
import {
  NotificationChannel,
  type NotificationTable,
} from "@features/notification/types/notification.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

export const useNotification = (userId: string) => {
  const { addChannel, started } = useRealtimeHandler();
  const setNotifications = useNotificationStore((state) => state.setNotifications);
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!started) return;
    const removeChannel = addChannel(
      (SupabaseClient) => {
        const channel = SupabaseClient.channel(NotificationChannel);

        channel.on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            if (payload.new) {
              addNotification(payload.new as NotificationTable["Row"]);
            }
          },
        );
        return channel;
      },
      false,
      {
        onSubscribe: () => {
          void getNotifications(userId, setNotifications);
        },
      },
    );

    return () => {
      removeChannel();
    };
  }, [started, addChannel, userId, setNotifications, addNotification]);
};
