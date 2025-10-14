import { twMerge } from "tailwind-merge";

type UserStatusType = "online" | "offline";

type ChatListItemProps = {
  avatar?: string;
  type?: UserStatusType;
  name?: string;
  message?: string;
  lastTime?: Date;
  unreadCount?: number;
  className?: string;
  onClick?: () => void;
};

function formatLastTime(d: Date): string {
  const now = new Date();

  const isSameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const y = new Date(now);
  y.setDate(now.getDate() - 1);
  const isYesterday =
    d.getFullYear() === y.getFullYear() &&
    d.getMonth() === y.getMonth() &&
    d.getDate() === y.getDate();

  if (isSameDay) {
    return d.toLocaleTimeString("ko-KR", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  if (isYesterday) return "어제";
  return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export default function ChatListItem({
  avatar = "https://picsum.photos/seed/user1/80",
  type = "online",
  name = "홍길동",
  message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  lastTime = new Date(Date.now() - 14 * 60 * 60 * 1000),
  unreadCount = 99,
  className,
  onClick,
}: ChatListItemProps) {
  const hasUnread = typeof unreadCount === "number" && unreadCount > 0;

  return (
    <div
      className={twMerge(
        "group relative flex min-h-[82px] w-full min-w-[400px] items-center rounded-[12px] transition select-none",
        "mb-2 gap-[12px] px-[16px] py-[12px]",
        "bg-wh/8 border-wh/10 hover:bg-wh/20 active:bg-wh/20",
        "hover:border-wh/15 active:border-wh/15",
        "dark:bg-bl/25 dark:border-wh/10 dark:hover:bg-bl/45 dark:active:bg-bl/45",
        "dark:hover:border-wh/15 dark:active:border-wh/15",
        className,
      )}
      draggable={false}
      onClick={onClick}
    >
      {/* 왼쪽: 아바타 + 상태 */}
      <div className="relative mt-1 mr-[16px] h-[52px] w-[52px]">
        <div className="h-full w-full overflow-hidden rounded-[26px] border-[2px] border-white/15 dark:border-white/15">
          {avatar && (
            <img src={avatar} alt="" className="h-full w-full object-cover" draggable={false} />
          )}
        </div>
        <span
          className={twMerge(
            "absolute right-0.5 bottom-1 h-[16px] w-[16px] rounded-[8px]",
            "border-wh dark:border-wh border-[2px]",
            type === "online" ? "bg-green-500" : "bg-gray-400",
          )}
          aria-hidden="true"
        />
      </div>

      {/* 본문 */}
      <div className="min-w-0 flex-1 pr-[72px]">
        <div className="flex items-center">
          <span className="flex-1">
            <span className="label-text-m-semibold text-wh">{name}</span>
          </span>
        </div>
        <p className="paragraph-text-s text-wh/75 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {message}
        </p>
      </div>

      {/* 우측: 마지막 메시지 시간 + 안읽은 횟수 */}
      <div
        className={twMerge(
          "absolute inset-y-0 right-[16px] flex w-[56px] flex-col items-end gap-2",
          hasUnread ? "justify-center" : "justify-start pt-[20px]",
        )}
      >
        <span className="label-text-xs text-wh/70">{formatLastTime(lastTime)}</span>

        {hasUnread && (
          <span
            className={twMerge(
              "inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-[6px]",
              "label-text-xs text-wh",
              "bg-red-500",
            )}
            aria-label={`${unreadCount} unread messages`}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
