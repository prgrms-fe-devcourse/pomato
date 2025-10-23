import { Bell } from "lucide-react";

import EmptyState from "@components/Empty";
import { NotificationProvider } from "@features/notification/ui/NotificationChannel";
import NotificationList from "@features/notification/ui/NotificationList";
import { useUserId } from "@stores/useAuthStore";

export default function Notification() {
  const id = useUserId();

  if (!id)
    return (
      <div className="h-full w-full p-[16px]">
        <EmptyState
          title="로그인이 필요합니다"
          description="소식을 확인하려면 로그인하세요"
          className="border-wh/6 rounded-[12px] border-1"
          Icon={Bell}
        />
      </div>
    );

  return (
    <div className="h-full w-full p-[16px]">
      <NotificationProvider userId={id}>
        <NotificationList />
      </NotificationProvider>
    </div>
  );
}
