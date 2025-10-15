import { MessageCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

type UserStatusType = "online" | "offline";

type UserListItemProps = {
  avatar?: string;
  type?: UserStatusType;
  name?: string;
  className?: string;
};

export default function UserListItem({
  avatar = "https://picsum.photos/seed/user1/80",
  type = "online",
  name = "김철수",
  className,
}: UserListItemProps) {
  return (
    <div
      className={twMerge(
        "group relative flex min-h-[78px] w-full min-w-[400px] items-center rounded-[12px] transition select-none",
        "mb-2 border-[1px] px-[16px] py-[12px]",
        "bg-wh/8 border-wh/10",
        "dark:bg-bl/25 dark:border-wh/10",
        "hover:bg-wh/12 dark:hover:bg-bl/35",
        "active:bg-wh/20 dark:active:bg-bl/45",
        className,
      )}
      draggable={false}
    >
      <div className="flex items-center gap-[16px]">
        <div className="relative mt-1 h-[52px] w-[52px]">
          <div className="h-full w-full overflow-hidden rounded-[26px] border-[2px] border-white/15 dark:border-white/15">
            {avatar && (
              <img
                src={avatar}
                alt={`${name}'s avatar`}
                className="h-full w-full object-cover"
                draggable={false}
              />
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

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center">
            <span className="flex-1 whitespace-nowrap">
              <span className="label-text-s-semibold text-wh">{name}</span>
            </span>
          </div>
          <p
            className={twMerge(
              "paragraph-text-s mt-1 first-letter:uppercase",
              type === "online" ? "text-green-500" : "text-wh/60",
            )}
          >
            {type}
          </p>
        </div>
      </div>

      <div className="absolute inset-y-0 right-[16px] flex items-center">
        <button
          type="button"
          className={twMerge(
            "text-wh inline-flex h-8 w-8 items-center justify-center rounded-[10px] border-[1px]",
            "bg-wh/20 border-wh/15 hover:bg-wh/30 hover:border-wh/25 active:bg-wh/35",
            "dark:bg-bl/30 dark:border-wh/12 dark:hover:bg-bl/40 dark:hover:border-wh/18 dark:active:bg-bl/45",
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
          draggable={false}
        >
          <MessageCircle className="text-wh h-[14px] w-[14px]" aria-hidden={true} />
        </button>
      </div>
    </div>
  );
}
