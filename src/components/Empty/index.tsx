import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

/**
 * 사용자에게 비어있는 상태(Empty)나 접근 제약 상태를 알려주는 공통 컴포넌트입니다.
 * Tailwind 스타일이 적용되어 있으며, 상단 아이콘, 설명, 액션 버튼(아이콘 포함)을 지원합니다.
 *
 * @component
 *
 * @example
 * ```tsx
 * import { MessageCircle, LogIn, Inbox } from "lucide-react";
 *
 * // 아이콘 + 액션 버튼(아이콘 포함)
 * <EmptyState
 *   title="로그인이 필요합니다."
 *   description="메시지를 보내려면 로그인하세요"
 *   Icon={MessageCircle}
 *   action={{
 *     label: "로그인",
 *     icon: LogIn,
 *     actionClassName: "",
 *     onClick: () => {
 *       console.log("로그인 버튼 클릭");
 *     },
 *   }}
 * />
 *
 * // 아이콘 + 액션 버튼(아이콘 없음)
 * <EmptyState
 *   title="채팅이 없습니다."
 *   description="아직 채팅방이 없습니다"
 *   Icon={Inbox}
 *   action={{
 *     label: "채팅 시작하기",
 *     actionClassName: "",
 *     onClick: () => {
 *       console.log("채팅 시작 버튼 클릭");
 *     },
 *   }}
 * />
 * ```
 *
 * @param {object} props - EmptyState 컴포넌트의 속성
 * @param {string} props.title - 상단 제목 텍스트
 * @param {string} props.description - 설명 텍스트
 * @param {string} [props.className] - 루트 섹션의 추가 Tailwind 클래스명
 * @param {React.ComponentType<React.SVGProps<SVGSVGElement>>} [props.Icon]
 *  상단 상태 아이콘(예: Lucide 아이콘)
 * @param {string} [props.iconStyle] - 아이콘에 추가할 Tailwind 클래스명
 * @param {Action} [props.action] - 액션 버튼 설정 객체
 * @param {string} props.action.label - 액션 버튼의 텍스트 라벨 (필수)
 * @param {LucideIcon} [props.action.icon] - 액션 버튼 왼쪽에 표시할 아이콘 (선택)
 * @param {() => void} [props.action.onClick] - 액션 버튼 클릭 시 실행될 함수 (선택)
 * @param {string} [props.action.actionClassName] - 액션 버튼에 추가할 Tailwind 클래스명 (선택)
 *
 * @returns {JSX.Element} 비어있는 상태를 나타내는 섹션 엘리먼트
 */

// 액션(실행) 버튼
type Action = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  actionClassName?: string;
};

// Empty State 관리
type EmptyStateProps = {
  title: string;
  description: string;
  Icon?: LucideIcon;
  iconStyle?: string;
  className?: string;
  action?: Action;
};

export default function EmptyState({
  title,
  description,
  Icon,
  iconStyle,
  className,
  action,
}: EmptyStateProps) {
  return (
    <section
      className={twMerge(
        "flex h-full w-full items-center justify-center gap-[24px] transition",
        "bg-wh/4 border-wh/6",
        "dark:bg-bl/15 dark:border-wh/6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-[24px] text-center">
        {Icon && (
          <Icon
            width={64}
            height={64}
            className={twMerge("text-wh/60 dark:text-wh/50 group-focus-within:text-wh", iconStyle)}
          />
        )}

        <div className="flex flex-col gap-[12px]">
          <p className="text-wh/100 label-text-m-bold">{title}</p>
          <p className="text-wh/75 dark:text-wh/70 label-text-s">{description}</p>
        </div>

        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className={twMerge(
              "inline-flex h-[32px] min-w-[98px] items-center justify-center gap-[8px]",
              "label-text-s transition",
              "rounded-[8px] border-[1px]",
              // default
              "bg-wh/20 text-wh border-wh/15",
              "dark:bg-bl/30 dark:text-wh dark:border-wh/12",
              // hover
              "hover:bg-wh/30 hover:border-wh/25",
              "dark:hover:bg-bl/40 dark:hover:border-wh/18",
              // active
              "active:bg-wh/40 active:border-wh/35",
              "dark:active:bg-bl/50 dark:active:border-wh/25",
              action?.icon ? "px-2" : "px-4",
              action.actionClassName,
            )}
          >
            {action.icon && <action.icon width={14} height={14} className={twMerge("text-wh")} />}
            {action.label}
          </button>
        )}
      </div>
    </section>
  );
}
