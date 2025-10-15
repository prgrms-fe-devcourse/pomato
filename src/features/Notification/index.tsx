import { Check, X, Heart, Mail, MessageCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";

/**
 * @component
 *
 * @example
 * ```tsx
 * import { Heart, MessageCircle, Mail, UserRound } from "lucide-react";
 *
 * // 좋아요 알림 (이미지 아바타)
 * <NotificationItem
 *   avatar="https://example.com/avatar.jpg"
 *   type="like"
 *   name="김철수"
 *   comment="정말 멋진 디자인이네요! 👍"
 * />
 *
 * // 댓글 알림 (아이콘 아바타)
 * <NotificationItem
 *   avatar={UserRound}
 *   type="comment"
 *   name="이영희"
 *   comment="이 부분에 대해 더 자세히 설명해주실 수 있나요?"
 * />
 *
 * // 메시지 알림
 * <NotificationItem
 *   type="message"
 *   name="박민수"
 *   comment="회의 시간을 3시로 변경해도 될까요?"
 * />
 * ```
 *
 * @param {object} props - NotificationItem 컴포넌트의 속성
 * @param {string | LucideIcon} [props.avatar=UserRound] - 사용자 아바타 (이미지 URL 또는 Lucide 아이콘)
 * @param {NotificationType} [props.type="like"] - 알림 타입 ("like" | "message" | "comment")
 * @param {string} [props.name="홍길동"] - 사용자 이름
 * @param {string} [props.comment] - 알림 내용/댓글 (기본값: Lorem Ipsum 텍스트)
 * @param {string} [props.className] - 루트 컨테이너에 추가할 Tailwind 클래스명
 *
 * @returns {JSX.Element} 알림 목록 항목을 나타내는 div 엘리먼트
 */

type NotificationType = "like" | "message" | "comment";

const typeIconMap = {
  comment: MessageCircle,
  message: Mail,
  like: Heart,
} as const;

type NotificationItemProps = {
  avatar?: string;
  type?: NotificationType;
  name: string;
  comment: string;
  className?: string;
};

const TITLE_SUFFIX = {
  like: "님이 좋아요를 남겼습니다",
  message: "님이 메세지를 보냈습니다",
  comment: "님이 댓글을 남겼습니다",
} as const;

export default function NotificationItem({
  avatar,
  type = "like",
  name = "홍길동",
  comment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  className,
}: NotificationItemProps) {
  const TypeIcon = typeIconMap[type];

  const hasImage = typeof avatar === "string";

  return (
    <div
      className={twMerge(
        "group relative min-h-[77px] w-[405px] rounded-[10px] transition select-none",
        "flex min-h-[77px] w-full min-w-[405px]",
        "mb-2 px-[16px] py-[12px]",
        "bg-wh/8 border-wh/10",
        "dark:bg-bl/25 dark:border-wh/10",
        className,
      )}
      draggable={false}
    >
      <div className="flex w-full items-start gap-[16px]">
        {/* 아바타 영역 */}
        {hasImage ? <Avatar src={avatar} size={"s"} /> : <Avatar size={"s"} />}

        {/* Content */}
        <div className="relative flex-1">
          <div className="relative flex min-h-[28px] w-full items-center">
            {/* 좌측: 이름 + 메세지 타입 아이콘 */}
            <span className="inline-flex min-w-0 flex-1 items-center">
              <TypeIcon
                className="text-wh/60 mr-1 h-[14px] w-[14px] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="label-text-s-semibold text-wh mr-[2px] truncate">{name}</span>
              <span className="label-text-s text-wh/65 flex-shrink-0">{TITLE_SUFFIX[type]}</span>
            </span>

            {/* 우측: 시간 , hover일 경우 확인/삭제 버튼 표시 */}
            <div className="absolute top-0 right-0 flex items-center">
              <span
                className={twMerge(
                  "label-text-xs text-wh/60",
                  "inline-flex h-6 items-center leading-none transition-none",
                  "opacity-100 group-hover:pointer-events-none group-hover:opacity-0",
                )}
              >
                2h
              </span>

              {/* 액션: hover 시 노출 */}
              <div className={twMerge("hidden items-center gap-[6px]", "group-hover:flex")}>
                {/* 확인 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 확인 버튼 클릭 시 실행할 함수 선언
                  }}
                  className={twMerge(
                    "inline-flex h-7 w-7 items-center justify-center rounded-[6px] transition-none",
                    "hover:bg-wh/15 dark:hover:bg-bl/50 transition-colors",
                  )}
                  aria-label="확인"
                  draggable={false}
                >
                  <Check className="text-wh/85 h-4 w-4" aria-hidden />
                </button>

                {/* 닫기 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 닫기 버튼 클릭 시 실행할 함수 선언
                  }}
                  className={twMerge(
                    "inline-flex h-7 w-7 items-center justify-center rounded-[6px] transition-none",
                    "hover:bg-wh/15 dark:hover:bg-bl/50 transition-colors",
                  )}
                  aria-label="닫기"
                  draggable={false}
                >
                  <X className="text-wh/85 h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          {/* 본문 */}
          {comment && (
            <p className="paragraph-text-s text-wh/85 mt-1" title={comment}>
              {comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
