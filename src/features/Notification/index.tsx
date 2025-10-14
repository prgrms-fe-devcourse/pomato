import { Check, X, Heart, Mail, MessageCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

/**
 * NotificationItem
 *
 * 스크린샷의 알림 카드 스타일을 단일 컴포넌트로 구현
 *
 * - props
 *   - avatar: string (이미지 URL 또는 이니셜 텍스트)
 *   - type: "like" | "message" | "comment"
 *   - name: string
 *   - comment?: string
 *   - occurredTime?: string (ex. "2h", "3h")
 *
 * @component
 *
 * @example
 * ```tsx
 * <NotificationItem
 *   avatar="https://picsum.photos/80"
 *   type="comment"
 *   name="Sarah Kim"
 *   comment="This looks amazing! The glassmorphism effect is so clean and modern. 🙂"
 *   occurredTime="2h"
 * />
 *
 * <NotificationItem
 *   avatar="SK" // 이니셜 텍스트도 가능
 *   type="like"
 *   name="Jordan Taylor"
 *   comment="Love the consistency across all components!"
 *   occurredTime="3h"
 * />
 * ```
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
  name?: string;
  comment?: string;
  occurredTime?: Date;
  className?: string;
  onConfirm?: () => void;
  onClose?: () => void;
};

const TITLE_SUFFIX: Record<NotificationType, string> = {
  like: "님이 좋아요를 남겼습니다",
  message: "님이 메세지를 보냈습니다",
  comment: "님이 댓글을 남겼습니다",
};

// 메세지 시간 발생 기준을 표시 (date 타입을 계산하여 표시하는 함수)
function formatOccurredTime(value: Date, now: Date = new Date()): string {
  const diffMs = Math.max(0, now.getTime() - value.getTime());

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}m`; // 0분도 최소 1m

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`; // 1h, 2h, 3h, ... 23h

  const days = Math.floor(hours / 24);
  return `${days}d`; // 1d, 2d, ...
}

export default function NotificationItem({
  avatar = "https://picsum.photos/seed/user1/80",
  type = "like",
  name = "홍길동",
  comment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  occurredTime = new Date(Date.now() - 14 * 60 * 60 * 1000),
  className,
  onConfirm,
  onClose,
}: NotificationItemProps) {
  const TypeIcon = typeIconMap[type];

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
        <div
          className={twMerge(
            "mt-1 h-[40px] w-[40px] overflow-hidden rounded-[20px] border-[2px]",
            "border-white/15 dark:border-white/15",
          )}
          aria-hidden="true"
        >
          {avatar ? (
            <img src={avatar} alt="" className="h-full w-full object-cover" draggable={false} />
          ) : (
            <img src={avatar} alt="" className="h-full w-full object-cover" draggable={false} />
          )}
        </div>

        {/* Content */}
        <div className="relative flex-1">
          <div className="relative flex min-h-[28px] w-full items-center">
            {/* 좌측: 이름 + 메세지 타입 아이콘 */}
            <span className="inline-flex min-w-0 flex-1 items-center">
              <TypeIcon className="text-wh/60 mr-1 h-[14px] w-[14px] flex-shrink-0" aria-hidden />
              <span className="label-text-s-semibold text-wh mr-[2px] truncate">{name}</span>
              <span className="label-text-s text-wh/65 flex-shrink-0">{TITLE_SUFFIX[type]}</span>
            </span>

            {/* 우측: 시간 , hover일 경우 확인/삭제 버튼 표시 */}
            <div className="absolute top-0 right-0 flex items-center">
              {occurredTime && (
                <span
                  className={twMerge(
                    "label-text-xs text-wh/60",
                    "inline-flex h-6 items-center leading-none transition-none",
                    "opacity-100 group-hover:pointer-events-none group-hover:opacity-0",
                  )}
                  aria-label={`time ${formatOccurredTime(occurredTime)}`}
                >
                  {formatOccurredTime(occurredTime)}
                </span>
              )}

              {/* 액션: hover 시 노출 */}
              <div className={twMerge("hidden items-center gap-[6px]", "group-hover:flex")}>
                {/* 확인 */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConfirm?.();
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
                    onClose?.();
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
