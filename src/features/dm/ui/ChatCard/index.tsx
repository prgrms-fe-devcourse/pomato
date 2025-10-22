import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import { getProfile } from "@features/auth/api/profile";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";
import type { ProfilesTable } from "@features/user/types/user.type";

/**
 * @component
 *
 * @example
 * ```tsx
 * import { UserRound, MessageCircle } from "lucide-react";
 *
 * // 기본 사용법 (이미지 아바타)
 * <ChatCard
 *   avatar="https://example.com/avatar.jpg"
 *   type="online"
 *   name="김철수"
 *   message="안녕하세요! 오늘 날씨가 좋네요."
 *   unreadCount={3}
 * />
 *
 * // 아이콘 아바타 사용
 * <ChatCard
 *   avatar="https://example.com/avatar.jpg"
 *   type="offline"
 *   name="이영희"
 *   message="내일 회의 준비는 어떻게 되었나요?"
 *   unreadCount={0}
 * />
 *
 * // 기본값 사용
 * <ChatListItem />
 * ```
 *
 * @param {object} props - ChatListItem 컴포넌트의 속성
 * @param {string} [props.avatar] - 사용자 아바타 (이미지 URL)
 * @param {UserStatusType} [props.type="offline"] - 사용자 상태 ("online" | "offline")
 * @param {string} [props.name="홍길동"] - 사용자 이름
 * @param {string} [props.message] - 마지막 메시지 내용 (기본값: Lorem Ipsum 텍스트)
 * @param {number} [props.unreadCount=99] - 읽지 않은 메시지 수 (0이면 표시되지 않음)
 * @param {string} [props.className] - 루트 컨테이너에 추가할 Tailwind 클래스명
 *
 * @returns {JSX.Element} 채팅 목록 항목을 나타내는 div 엘리먼트
 */

type ChatCardProps = {
  userId: string;
  message: string;
  unreadCount?: number;
  className?: string;
};

export default function ChatCard({
  message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  unreadCount = 99,
  className,
  userId,
}: ChatCardProps) {
  const [profile, setProfile] = useState<ProfilesTable["Row"]>();
  const activeUsers = useActiveUsersStore((state) => state.activeUsers);
  const hasUnread = typeof unreadCount === "number" && unreadCount > 0;

  useEffect(() => {
    const fetchPartner = async () => {
      const data = await getProfile(userId);
      if (data === null) throw new Error("사용자를 찾을 수 없습니다");
      setProfile(data);
    };

    void fetchPartner();
  }, [userId]);
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
    >
      {/* 왼쪽: 아바타 + 상태 */}
      <div className="relative mt-1 mr-[16px] h-[52px] w-[52px]">
        {/* 아바타 영역 */}

        <Avatar
          src={profile?.avatar_url ?? undefined}
          status={activeUsers.some((user) => user.id === userId) ? "online" : "offline"}
        />
      </div>

      {/* 본문 */}
      <div className="min-w-0 flex-1 pr-[72px]">
        <div className="flex items-center">
          <span className="flex-1">
            <span className="label-text-m-semibold text-wh">{profile?.display_name ?? ""}</span>
          </span>
        </div>
        <p className="paragraph-text-s text-wh/75 mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {message}
        </p>
      </div>

      {/* 우측: 마지막 메시지 시간 + 안읽은 횟수 */}
      <div
        className={twMerge(
          "absolute inset-y-0 right-[16px] flex min-w-[60px] flex-col items-end gap-2",
          hasUnread ? "justify-center" : "justify-start pt-[20px]",
        )}
      >
        <span className="label-text-xs text-wh/70 pb-1">오후 12:10</span>

        {hasUnread && (
          <span
            className={twMerge(
              "inline-flex h-[20px] min-w-[20px] items-center justify-center rounded-full px-[6px]",
              "label-text-xs text-wh",
              "bg-red-500",
            )}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
