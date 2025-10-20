import { useEffect } from "react";

import { offFromActiveUser, onFromActiveUser } from "@features/user/api/activeUser";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import { ActiveUsersTopic } from "@features/user/type/activeUsers.type";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";
import supabase from "@utils/supabase";

export const usePresenceActiveUsers = () => {
  const { addChannel, started } = useRealtimeHandler();
  const { setActiveUsers, addActiveUsers, removeActiveUsers } = useActiveUsersStore();
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
          const channel = supabaseClient.channel(ActiveUsersTopic, {
            config: { presence: { key: user.id } },
          });

          // presence 채널 동기화 => acrive_user 추가 / 현재 활성 사용자 저장
          channel.on("presence", { event: "sync" }, () => {
            const state = channel.presenceState();
            const users = Object.entries(state).map(([id]) => ({ id }));
            const isConnected = !!state[user.id];

            setActiveUsers(users);
            if (isConnected) {
              void onFromActiveUser();
            }
          });

          // presence 채널 다른 사용자 참여 => 추가 활성 사용자 저장
          channel.on("presence", { event: "join" }, ({ newPresences }) => {
            const users = Object.entries(newPresences).map(([id]) => ({ id }));
            addActiveUsers(users);
          });

          // presence 채널 다른 사용자 이탈 => 이탈 사용자 제거
          channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
            const users = Object.entries(leftPresences).map(([id]) => ({ id }));
            removeActiveUsers(users);
          });

          return channel;
        },
        true,
        {
          // 구독 시작 시 추적(실행)
          onSubscribe: (channel) => {
            void (async () => {
              await channel.track({ id: user.id });
            })();
            return channel;
          },
          // 이탈 및 종료 시 active_user 테이블 제거 실행
          onClose: () => {
            void offFromActiveUser();
          },
          // 에러 발생 시 active_user 테이블 제거 실행
          onError: () => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);
};
