import type React from "react";

import { useNotification } from "@features/notification/hooks/useNotification";

type NotificationChannelProps = {
  userId: string;
  children: React.ReactNode;
};

export const NotificationChannel = ({ userId, children }: NotificationChannelProps) => {
  useNotification(userId);
  return <>{children}</>;
};
