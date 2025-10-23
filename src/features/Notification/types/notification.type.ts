import type { Database } from "@type/database.types";

export const NotificationChannel = "postgre_notification" as const;

export type NotificationTable = Database["public"]["Tables"]["notifications"];

export type NotificationType = Database["public"]["Enums"]["notification_type"];

export type NotificationLikeJsonbType = {
  post_id: string;
  user_id: string;
};

export type NotificationDmJsonbType = {
  conversation_id: string;
  message_id: string;
  user_id: string;
  content: string;
};

export type NotificationCommentJsonbType = {
  post_id: string;
  comment_id: string;
  user_id: string;
  content: string;
};

export type NotificationJsonbType = NotificationCommentJsonbType &
  NotificationLikeJsonbType &
  NotificationDmJsonbType;
