import { Bell } from "lucide-react";

import EmptyState from "@components/Empty";
import { useNotificationStore } from "@features/alarm/stores/useNotificationStore";
import type { NotificationJsonbType } from "@features/alarm/types/notification.type";
import NotificationCard from "@features/alarm/ui/NotificationCard";

export default function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);

  if (notifications.length === 0)
    return (
      <EmptyState
        title="소식이 없습니다"
        description="모든 소식을 확인했습니다"
        className="border-wh/6 rounded-[12px] border-1"
        Icon={Bell}
      />
    );

  return (
    <div>
      {notifications.map((notification) => {
        return (
          <NotificationCard
            key={notification.id}
            type={notification.type}
            payload={notification.payload as NotificationJsonbType}
            notificationId={notification.id}
          />
        );
      })}
    </div>
  );
}
