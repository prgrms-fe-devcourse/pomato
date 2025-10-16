import { ChevronDown, MoreHorizontal, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";

type DropdownItem = {
  key: string;
  label: string;
  icon?: LucideIcon;
  onSelect?: () => void;
  disabled?: boolean;
  isRed?: boolean; // 빨간 톤 강조
};

type DropdownProps = {
  isEnable?: boolean;
  Icon?: string | LucideIcon;
  iconText?: string;
  items: DropdownItem[];
  className?: string;
};

export default function Dropdown({
  isEnable = true,
  Icon,
  iconText,
  items,
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // iconText만 있으면 기본 Avatar가 표시 되어야함
  // icon은 있으나 iconText가 없으면 그냥 MoreHorizontal 표시 (거의 그럴일은 없으나 에러 처리가 필요해서 로직 추가)
  const hasLabelTrigger = (!Icon && iconText) || iconText;

  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [open]);

  return (
    <div ref={ref} className={twMerge("relative inline-flex select-none", className)}>
      {hasLabelTrigger ? (
        <Button
          onClick={toggle}
          className={twMerge(
            "inline-flex items-center justify-center rounded-[6px] whitespace-nowrap transition-colors",
            "hover:text-bl flex items-center gap-2 px-4 py-2",
            "hover:bg-wh/15 dark:hover:bg-bl/25",
            open && "bg-wh/15 dark:bg-bl/25",
          )}
          intent="reveal"
          draggable={false}
        >
          {/* 좌측 아이콘 */}
          {Icon && typeof Icon === "string" ? (
            <Avatar containerStyle="h-[24px] w-[24px]" src={Icon} aria-hidden />
          ) : (
            <Avatar containerStyle="h-[24px] w-[24px]" aria-hidden />
          )}
          {/* 텍스트 */}
          <span className="label-text-s">{iconText}</span>
          {/* 드롭다운 캐럿 */}
          <ChevronDown
            className={twMerge("h-4 w-4 transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </Button>
      ) : (
        <Button
          onClick={toggle}
          draggable={false}
          intent="reveal"
          composition="iconOnly"
          className={twMerge(
            "inline-flex h-[24px] w-[24px] items-center justify-center rounded-[6px] transition-colors",
            "hover:bg-wh/15 dark:hover:bg-bl/25",
            open && "bg-wh/15 dark:bg-bl/25",
          )}
        >
          <MoreHorizontal className="text-wh h-4 w-4" aria-hidden />
        </Button>
      )}

      {/* 메뉴 영역 */}
      {open && (
        <div
          role="menu"
          className={twMerge(
            "absolute right-0 z-[999] mt-6 min-w-[160px] rounded-[8px] border px-[7px] py-[7px]",
            "bg-wh/30 border-wh/25 dark:bg-bl/40 dark:border-wh/18",
            hasLabelTrigger && "mt-10",
          )}
          onClick={() => setOpen(false)}
        >
          <ul className="flex flex-col">
            {items.map((item) => {
              const ItemIcon = item.icon;
              const isDisabled = !isEnable || !!item.disabled;
              return (
                <li key={item.key}>
                  {/* 해당 부분은 item.isRed에 따라 background 컬러 변경이 적용이 안되는 문제 때문에 기존의 button을 사용했습니다.
                  Button 컴포넌트에서 text-red-500은 되지만 bg-red-500/15는 적용이 안되는 문제 */}
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;
                      item.onSelect?.();
                    }}
                    className={twMerge(
                      "inline-flex h-[37px] w-[146px] items-center justify-start gap-[10px]",
                      "label-text-s rounded-[6px] px-[12px] transition-colors",
                      item.isRed
                        ? "text-red-500 hover:bg-red-500/15"
                        : "hover:bg-wh/20 dark:hover:bg-bl/40",
                      isDisabled && "pointer-events-none cursor-not-allowed opacity-40",
                    )}
                  >
                    {ItemIcon && (
                      <ItemIcon
                        className={twMerge("h-4 w-4", item.isRed && "text-red-500")}
                        aria-hidden
                      />
                    )}
                    <span className={twMerge("text-wh", item.isRed && "text-red-500")}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
