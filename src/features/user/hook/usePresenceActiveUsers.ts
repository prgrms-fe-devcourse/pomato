import { useEffect } from "react";

import { offFromActiveUser, onFromActiveUser } from "@features/user/api/activeUser";
import { PresenceActiveUsersTopic } from "@features/user/types/activeUsers.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";
import supabase from "@utils/supabase";

export const usePresenceActiveUsers = () => {
  const { addChannel, started } = useRealtimeHandler();

  useEffect(() => {
    if (!started) return;
    const setupPresence = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.warn("유저 정보 없음 — presence key 설정 불가");
        return;
      }

      // 채널 등록 함수
      const removeChannel = addChannel(
        (supabaseClient) => {
          const channel = supabaseClient.channel(PresenceActiveUsersTopic, {
            config: { presence: { key: user.id } },
          });

          // presence 채널 동기화 => active_user 추가 / 현재 활성 사용자 저장
          channel.on("presence", { event: "sync" }, () => {});

          return channel;
        },
        true,
        {
          // 구독 시작 시 추적(실행)
          onSubscribe: (channel) => {
            void (async () => {
              await channel.track({ id: user.id });
              await onFromActiveUser();
            })();
            return channel;
          },
          // 이탈 및 종료 시 active_user 테이블 제거 실행
          onClose: () => {
            void offFromActiveUser();
          },
        },
      );

      return removeChannel;
    };

    const cleanupPromise = setupPresence();

    return () => {
      void cleanupPromise.then((unsubscribe) => {
        if (typeof unsubscribe === "function") unsubscribe();
      });
    };
  }, [addChannel, started]);
};
