import { MessageCircle, UserRound, type LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";

/**
 * @component
 *
 * @example
 * ```tsx
 * import { MessageCircle } from "lucide-react";
 *
 * // 기본 사용법
 * <UserListItem
 *   avatar="https://example.com/avatar.jpg"
 *   type="online"
 *   name="김철수"
 * />
 *
 * // 오프라인 사용자
 * <UserListItem
 *   avatar="https://example.com/avatar2.jpg"
 *   type="offline"
 *   name="이영희"
 *   className="mb-4"
 * />
 *
 * // 기본값 사용
 * <UserListItem />
 * ```
 *
 * @param {object} props - UserListItem 컴포넌트의 속성
 * @param {string|LucideIcon} [props.avatar=UserRound] - 사용자 아바타 이미지 URL 또는 Lucide 아이콘 컴포넌트. 기본값은 UserRound 아이콘입니다.
 * @param {UserStatusType} [props.type="online"] - 사용자 상태 ("online" | "offline")
 * @param {string} [props.name="김철수"] - 사용자 이름
 * @param {string} [props.className] - 루트 컨테이너에 추가할 Tailwind 클래스명
 *
 * @returns {JSX.Element} 사용자 목록 항목을 나타내는 div 엘리먼트
 */

type UserStatusType = "online" | "offline";

type UserListItemProps = {
  avatar?: string | LucideIcon;
  type?: UserStatusType;
  name: string;
  className?: string;
};

export default function UserListItem({
  avatar = UserRound,
  type = "offline",
  name,
  className,
}: UserListItemProps) {
  const hasImage = typeof avatar === "string";

  return (
    <div
      className={twMerge(
        "group relative flex min-h-[78px] w-full min-w-[400px] items-center rounded-[12px] transition select-none",
        "mb-2 border-[1px] px-[16px] py-[12px]",
        "bg-wh/8 border-wh/10",
        "dark:bg-bl/25 dark:border-wh/10",
        "hover:bg-wh/12 dark:hover:bg-bl/35",
        // "active:bg-wh/20 dark:active:bg-bl/45",
        className,
      )}
      draggable={false}
    >
      <div className="flex items-center gap-[16px]">
        {/* 아바타 영역 */}
        {hasImage ? <Avatar src={avatar} status={type || "default"} /> : <Avatar />}

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
        <Button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: 기능 추가
          }}
          className={twMerge(
            "text-wh inline-flex h-8 w-8 items-center justify-center rounded-[10px] border-[1px]",
            "bg-wh/20 border-wh/15 hover:bg-wh/30 hover:border-wh/25 active:bg-wh/35",
            "dark:bg-bl/30 dark:border-wh/12 dark:hover:bg-bl/40 dark:hover:border-wh/18 dark:active:bg-bl/45",
          )}
          size="md"
          aria-label="메세지 전송"
          draggable={false}
          composition={"iconOnly"}
        >
          <MessageCircle className="text-wh h-[14px] w-[14px]" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
