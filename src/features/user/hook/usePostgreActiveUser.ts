import { useEffect } from "react";

import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import { PostgreActiveUserTopic } from "@features/user/types/activeUsers.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";
import supabase from "@utils/supabase";

export const usePostgreActiveUser = () => {
  const { addChannel, started } = useRealtimeHandler();
  const { setActiveUsers } = useActiveUsersStore();

  useEffect(() => {
    if (!started) return;
    const fetchData = async () => {
      const { data, error } = await supabase.from("active_users").select("id");
      if (!error && data) {
        const users = data.map((row) => ({ id: row.id }));
        setActiveUsers(users);
      }
    };
    const removeChannel = addChannel(
      (supabaseClient) => {
        const channel = supabaseClient.channel(PostgreActiveUserTopic);
        channel.on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "active_users",
          },
          () => {
            void fetchData();
          },
        );
        return channel;
      },
      false,
      {
        onSubscribe: () => {
          void fetchData();
        },
      },
    );

    return () => {
      removeChannel();
    };
  }, [started, addChannel, setActiveUsers]);
};
