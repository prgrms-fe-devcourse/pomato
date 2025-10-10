import * as React from "react";
import { twMerge } from "tailwind-merge";

import type { EmptyStateProps } from "@features/Empty/type";

/*
  ==========================================
  Docs: EmptyState 컴포넌트 사용 가이드
  ==========================================

  1) 목적
  - 데이터가 없거나(Empty), 접근 조건이 충족되지 않을 때 표시하는 공통 상태 컴포넌트입니다.

  2) Props 설명
  - title (string, required): 상단 제목 텍스트
  - description (string, required): 설명 텍스트
  - className (string, optional): 루트 섹션에 추가할 tailwind 클래스

  - Icon (LucideIcon, optional): 상단 상태 아이콘
  - iconStyle (string, optional): 아이콘에 추가할 tailwind 클래스

  - action (object, optional): 액션 버튼 설정
      - label (string): 버튼 라벨
      - onClick (() => void): 클릭 핸들러
      - actionClassName (string, optional): 버튼에 추가할 tailwind 클래스
  - ActionIcon (LucideIcon, optional): 액션 버튼 왼쪽에 표시할 아이콘

  3) 기본 사용 예시

  // 공통 Import 
  import { MessageCircle, LogIn, Inbox } from "lucide-react";
  
  // 아이콘 + 액션 버튼(아이콘 포함 ✅)
  <EmptyState
    title="로그인이 필요합니다."
    description="메시지를 보내려면 로그인하세요"
    Icon={MessageCircle}
    action={{
      label: "로그인",
      actionClassName: "",
      onClick: () => {
        console.log("로그인 버튼 클릭");
      },
    }}
    ActionIcon={LogIn}
  />

  // 아이콘 + 액션 버튼(아이콘 없음 ❎)
  <EmptyState
    title="채팅이 없습니다."
    description="아직 채팅방이 없습니다"
    Icon={Inbox}
    action={{
      label: "채팅 시작하기",
      actionClassName: "",
      onClick: () => {
        console.log("채팅 시작 버튼 클릭");
      },
    }}
  />

  4) 스타일 팁
  - 아이콘 크기/색상은 내부에서 기본 제공되며, 필요 시 iconStyle/className으로 확장하세요.
  - 액션 버튼은 ActionIcon 유무에 따라 내부 padding이 자동 조절 (있는 경우 px-[8px] 없는 경우 px-[16px])됩니다.
*/

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  Icon,
  iconStyle,
  className,
  action,
  ActionIcon,
}) => {
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
          <label className="text-wh/100 label-text-m-bold text-[20px]">{title}</label>
          <label className="text-wh/75 dark:text-wh/70 label-text-s text-[15px]">
            {description}
          </label>
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
              ActionIcon ? "px-2" : "px-4",
              action.actionClassName,
            )}
          >
            {ActionIcon && (
              <ActionIcon width={14} height={14} className={twMerge("text-wh", iconStyle)} />
            )}
            {action.label}
          </button>
        )}
      </div>
    </section>
  );
};

export default EmptyState;
