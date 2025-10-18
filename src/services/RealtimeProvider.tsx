import { useEffect } from "react";

import { useSubscribeActiveUsers } from "@features/user/hook/useSubscribeActiveUsers";
import { useRealtimeHandler } from "@hooks/useRealtimeHandler";

type RealtimeProviderProps = {
  children: React.ReactNode | undefined;
};

export default function RealtimeProvider({ children }: RealtimeProviderProps) {
  const { start } = useRealtimeHandler();
  useEffect(() => {
    const realtimeCleanup = start();
    return () => {
      realtimeCleanup();
    };
  }, [start]);
  useSubscribeActiveUsers();
  // main에 위치한 함께하는 인원 컴포넌트를 위해 시작 이후 바로 채널 구독
  return <>{children}</>;
}
