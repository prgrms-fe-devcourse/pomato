import { ChevronRight, type LucideIcon } from "lucide-react";
import type React from "react";
import { twMerge } from "tailwind-merge";

type ItemProps = {
  name: string;
  description: string;
  Icon: LucideIcon;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
};
/**
 *
 * 설정 페이지에서 하나의 항목(Row)을 표시하는 버튼형 컴포넌트입니다.
 * 아이콘, 제목, 설명, 우측 이동 화살표(`ChevronRight`)를 포함합니다.
 *
 * @component
 *
 * @example
 * ```tsx
import { User, Trash } from "lucide-react";
 *
 * <div className="flex flex-col gap-3">
 *   <Item
 *     name="Profile"
 *     description="View or edit your account"
 *     Icon={User}
 *     onClick={() => console.log("Profile clicked")}
 *   />
 *
 *   <Item
 *     name="Delete Account"
 *     description="Permanently remove your data"
 *     Icon={Trash}
 *     danger
 *     onClick={() => console.log("Dangerous action")}
 *   />
 *
 *   <Item
 *     name="Notifications"
 *     description="Manage alerts and reminders"
 *     Icon={ChevronRight}
 *     disabled
 *   />
 * </div>
 * ```
 *
 * @param {object} props - Item 컴포넌트의 속성
 * 
 * @param {string} props.name - 
 *   항목의 제목(라벨)입니다. 사용자에게 표시되는 주요 텍스트로, 굵은 서체(`label-text-m-semibold`)로 렌더링됩니다.
 *
 * @param {string} props.description - 
 *   항목의 부가 설명 텍스트입니다. `name` 아래에 작은 서체(`label-text-small`)로 표시되며, hover/active 상태에서 색상 변화가 있습니다.
 *
 * @param {import("lucide-react").LucideIcon} props.Icon - 
 *   항목의 대표 아이콘 컴포넌트입니다.  
 *   Lucide 아이콘(예: `User`, `Settings`, `Trash` 등)을 전달할 수 있습니다.  
 *   아이콘은 좌측 원형 배경(`rounded-full`) 안에 표시됩니다.
 *
 * @param {boolean} [props.danger=false] - 
 *   항목이 위험(삭제, 경고 등) 동작임을 나타냅니다.  
 *   `true`일 경우 빨간색 계열(`red-500`) 스타일이 적용되고 hover 시 강조됩니다.
 *
 * @param {boolean} [props.disabled=false] - 
 *   항목이 비활성화 상태인지 여부입니다.  
 *   `true`이면 클릭이 불가능하고, 커서와 색상이 흐릿하게 표시됩니다.
 *
 * @param {() => void} [props.onClick] - 
 *   항목 클릭 시 실행되는 이벤트 핸들러입니다.  
 *   `disabled`가 `true`일 경우 이벤트는 전달되지 않습니다.
 *
 * @returns {JSX.Element} - 
 *   아이콘, 이름, 설명, 우측 화살표(`ChevronRight`)를 포함하는 버튼형 리스트 아이템 요소를 반환합니다.
 */
export default function Item({
  name,
  description,
  Icon,
  danger = false,
  disabled = false,
  className,
  onClick,
}: ItemProps) {
  return (
    <button
      type="button"
      className={twMerge(
        disabled
          ? "bg-wh/2 border-wh/4"
          : danger
            ? "bg-wh/4 dark:bg-bl/15 border-wh/6 hover:border-red-500/15 hover:bg-red-500/8 active:border-red-500/20 active:bg-red-500/12"
            : "bg-wh/4 dark:bg-bl/15 border-wh/6 hover:bg-wh/10 hover:border-wh/12 hover:dark:bg-bl/30 hover:dark:border-wh/10 active:bg-wh/15 active:border-wh/15 active:dark:bg-bl/40 active:dark:border-wh/12 border-1",
        "group flex cursor-pointer items-center justify-between rounded-[8px] px-[20px] py-[18px]",
        className,
      )}
      {...(!disabled && { onClick })}
      disabled={disabled}
    >
      <div className="flex items-center gap-[16px]">
        <div
          className={twMerge(
            disabled
              ? "bg-wh/8 text-wh/40"
              : danger
                ? "bg-red-500/15 text-red-500 group-hover:bg-red-500/20 group-active:bg-red-500/25"
                : "bg-wh/15 group-hover:bg-wh/20 group-active:bg-wh/25 text-wh",
            "flex h-[40px] w-[40px] items-center justify-center rounded-full",
          )}
        >
          <Icon />
        </div>
        <div className="flex flex-col justify-center gap-[4px] text-left select-none">
          <span
            className={twMerge(
              disabled ? "text-wh/50" : danger ? "text-red-500" : "text-wh",
              "label-text-m-semibold",
            )}
          >
            {name}
          </span>
          <span
            className={twMerge(
              disabled
                ? "text-wh/35"
                : danger
                  ? "text-red-500/70 group-hover:text-red-500/80 group-active:text-red-500/85"
                  : "text-wh/65 group-hover:text-wh/75 group-active:text-wh/80",
              "label-text-small",
            )}
          >
            {description}
          </span>
        </div>
      </div>
      <div
        className={twMerge(
          disabled
            ? "text-wh/30"
            : danger
              ? "text-red-500/85 group-hover:text-red-500/75 group-active:text-red-500/85"
              : "text-wh/50 group-hover:text-wh/70 group-active:text-wh/80",
        )}
      >
        <ChevronRight aria-hidden="true" />
      </div>
    </button>
  );
}
