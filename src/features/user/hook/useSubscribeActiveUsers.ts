import { useEffect } from "react";

import { ActiveUsersTopic } from "@features/user/type/activeUsers.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

export const useSubscribeActiveUsers = () => {
  const { addChannel, started } = useRealtimeHandler();

  useEffect(() => {
    const unsubscribe = addChannel((supabase) => {
      const channel = supabase.channel(ActiveUsersTopic, { config: { presence: { key: "id" } } });

      channel.on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        console.log(state);
      });

      channel.on("presence", { event: "join" }, ({ newPresences }) => {
        console.log(newPresences, "사용자 추가");
      });

      channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log(leftPresences, "사용자 나감");
      });
      return channel;
    }, false);

    return () => unsubscribe();
    /**
     * 구독 및 구독 취소만을 담당하는 커스텀 훅
     * store에 변경 상태를 의존할 필요가 없어서 실행 시만 사용할 수 있도록
     * eslint rule pass 적용
     */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);
};
