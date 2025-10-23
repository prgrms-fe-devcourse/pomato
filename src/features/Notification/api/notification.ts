import type { NotificationTable } from "@features/notification/types/notification.type";
import supabase from "@utils/supabase";

export const getNotifications = async (
  userId: string,
  setNotification: (notifications: NotificationTable["Row"][]) => void,
) => {
  const { data, error } = await supabase
    .from("notifications")
    .select<"*", NotificationTable["Row"]>("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("error fetching notifications", error);
    setNotification([]);
  }

  setNotification(data ?? []);
};

export const removeNotification = async (notificationId: string) => {
  const { error } = await supabase.from("notifications").delete().eq("id", notificationId);

  if (error) {
    console.error("Error deleting notification:", error);
    return false;
  }

  console.log(`Notification ${notificationId} deleted successfully`);
  return true;
};
