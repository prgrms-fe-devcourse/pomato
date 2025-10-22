import type { Constants } from "@type/database.types";

export type NotificationType = (typeof Constants)["public"]["Enums"]["notification_type"][number];

export type NotificationLikeJsonbType = {
  post_id: string;
  liked_by: string;
};

export type NotificationDmJsonbType = {
  conversation_id: string;
  message_id: string;
  sender_id: string;
  content: string;
};

export type NotificationCommentJsonbType = {
  post_id: string;
  comment_id: string;
  commented_by: string;
  content: string;
};

export type NotificationJsonbType = {
  like: NotificationLikeJsonbType;
  comment: NotificationCommentJsonbType;
  dm: NotificationDmJsonbType;
  setting: null;
};
