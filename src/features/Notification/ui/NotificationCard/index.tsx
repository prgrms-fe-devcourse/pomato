import {
  /*Check*, */ X,
  Heart,
  Mail,
  MessageCircle,
  type LucideIcon,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import { removeNotification } from "@features/notification/api/notification";
import { useNotificationStore } from "@features/notification/stores/useNotificationStore";
import type {
  NotificationCommentJsonbType,
  NotificationDmJsonbType,
  NotificationJsonbType,
  NotificationType,
} from "@features/notification/types/notification.type";
import { getUserById } from "@features/user/api/user";
import type { ProfilesTable } from "@features/user/types/user.type";

/**
 * NotificationCard
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
 * <NotificationCard
 *   avatar="https://picsum.photos/80"
 *   type="comment"
 *   name="Sarah Kim"
 *   comment="This looks amazing! The glassmorphism effect is so clean and modern. 🙂"
 *   occurredTime="2h"
 * />
 *
 * <NotificationCard
 *   avatar="SK" // 이니셜 텍스트도 가능
 *   type="like"
 *   name="Jordan Taylor"
 *   comment="Love the consistency across all components!"
 *   occurredTime="3h"
 * />
 * ```
 */

const typeIconMap: Record<NotificationType, LucideIcon> = {
  comment: MessageCircle,
  dm: Mail,
  like: Heart,
  system: Settings,
} as const;

type NotificationItemProps = {
  notificationId: string;
  type: NotificationType;
  payload: NotificationJsonbType;
  className?: string;
};

const TITLE_SUFFIX: Record<NotificationType, string> = {
  like: "님이 좋아요를 남겼습니다",
  dm: "님이 메세지를 보냈습니다",
  comment: "님이 댓글을 남겼습니다",
  system: "",
} as const;

export default function NotificationCard({
  notificationId,
  type = "like",
  payload,
  className,
}: NotificationItemProps) {
  const TypeIcon = typeIconMap[type];
  const [senderProfile, setSenderProfile] = useState<ProfilesTable["Row"] | null>(null);
  const [notify, setNotify] = useState<string>("");
  const removeNotificationStore = useNotificationStore((state) => state.removeNotifications);

  const handleClose = () => {
    removeNotificationStore(notificationId);
    // 낙관적 업데이트
    void removeNotification(notificationId);
  };

  useEffect(() => {
    const fetchSenderProfile = async () => {
      const data = await getUserById(payload.user_id);
      setSenderProfile(data);
    };
    void fetchSenderProfile();
  }, [payload.user_id]);

  useEffect(() => {
    const handleNotify = () => {
      switch (type) {
        case "dm": {
          const data = payload as NotificationDmJsonbType;
          setNotify(data.content);
          break;
        }
        case "comment": {
          const data = payload as NotificationCommentJsonbType;
          setNotify(data.content);
          break;
        }
        case "like": {
          setNotify(senderProfile?.display_name + "님이 좋아요를 눌렀습니다.");
          break;
        }
        case "system": {
          break;
        }
        default: {
          break;
        }
      }
    };
    handleNotify();
  }, [payload, type, senderProfile?.display_name]);

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
        <Avatar src={senderProfile?.avatar_url ?? undefined} size={"s"} />
        {/* Content */}
        <div className="relative flex-1">
          <div className="relative flex min-h-[28px] w-full items-center">
            {/* 좌측: 이름 + 메세지 타입 아이콘 */}
            <span className="inline-flex min-w-0 flex-1 items-center">
              <TypeIcon
                className="text-wh/60 mr-1 h-[14px] w-[14px] flex-shrink-0"
                aria-hidden="true"
              />
              <span className="label-text-s-semibold text-wh mr-[2px] truncate">
                {senderProfile?.display_name}
              </span>
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

                {/*<Button
                  onClick={(e) => {
                    e.stopPropagation();
                    // 확인 버튼 클릭 시 실행할 함수 선언
                  }}
                  className={
                    "hover:bg-wh/15 dark:hover:bg-bl/50 inline-flex h-7 w-7 items-center justify-center rounded-[6px] transition-colors transition-none"
                  }
                  intent={"reveal"}
                  aria-label="확인"
                  composition={"iconOnly"}
                >
                  <Check className="text-wh/85 h-4 w-4" aria-hidden />
                </Button>*/}

                {/* 닫기 */}

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    // 닫기 버튼 클릭 시 실행할 함수 선언
                  }}
                  className={twMerge(
                    "inline-flex h-7 w-7 items-center justify-center rounded-[6px] transition-none",
                    "hover:bg-wh/15 dark:hover:bg-bl/50 transition-colors",
                  )}
                  intent={"reveal"}
                  aria-label="확인"
                  composition={"iconOnly"}
                >
                  <X className="text-wh/85 h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          </div>

          {/* 본문 */}

          <p className="paragraph-text-s text-wh/85 mt-1">{notify}</p>
        </div>
      </div>
    </div>
  );
}
