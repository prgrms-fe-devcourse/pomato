import type React from "react";

import { useNotification } from "@features/alarm/hooks/useNotification";

type NotificationChannelProps = {
  userId: string;
  children: React.ReactNode;
};

export const NotificationProvider = ({ userId, children }: NotificationChannelProps) => {
  useNotification(userId);
  return <>{children}</>;
};
