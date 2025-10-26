import { Bell } from "lucide-react";
import { useState } from "react";

import EmptyState from "@components/Empty";
import { Toast } from "@components/Toast";
import type { ToastIntent } from "@components/Toast/intent";
import { useNotificationStore } from "@features/alarm/stores/useNotificationStore";
import type { NotificationJsonbType } from "@features/alarm/types/notification.type";
import NotificationCard from "@features/alarm/ui/NotificationCard";

type ToastType = { message: string; intent: ToastIntent };

export default function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const [toast, setToast] = useState<ToastType | null>(null);
  const showToast = (intent: ToastType["intent"], message: string) => setToast({ message, intent });

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
    <div className="pc-scroll flex flex-1 flex-col overflow-y-auto">
      {notifications.map((notification) => {
        return (
          <NotificationCard
            key={notification.id}
            type={notification.type}
            payload={notification.payload as NotificationJsonbType}
            notificationId={notification.id}
            createdAt={notification.created_at}
            setToast={showToast}
          />
        );
      })}
      {toast && (
        <Toast message={toast.message} intent={toast.intent} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
