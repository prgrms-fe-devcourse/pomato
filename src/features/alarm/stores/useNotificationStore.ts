import { create } from "zustand";

import type { NotificationTable } from "@features/alarm/types/notification.type";

type NotificationState = {
  notifications: NotificationTable["Row"][];
};

type NotificationAction = {
  setNotifications: (notifications: NotificationTable["Row"][]) => void;
  removeNotifications: (notificationId: string) => void;
  addNotification: (notification: NotificationTable["Row"]) => void;
};

export const useNotificationStore = create<NotificationState & NotificationAction>()((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications: notifications }),
  removeNotifications: (notificationId) =>
    set((prev) => ({
      notifications: prev.notifications.filter((n) => n.id !== notificationId),
    })),
  addNotification: (notification) =>
    set((prev) => ({
      notifications: prev.notifications.some((n) => n.id === notification.id)
        ? prev.notifications
        : [notification, ...prev.notifications],
    })),
}));
