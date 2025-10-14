import { MoreHorizontal, SquarePen, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 *
 * @component
 *
 * @example
 * ```tsx
 * import Dropdown from "./components/Dropdown";
 *
 * // 기본 사용법 (수정/삭제 모두 활성화)
 * <Dropdown
 *   onEdit={() => {
 *     console.log("수정 버튼 클릭");
 *   }}
 *   onDelete={() => {
 *     console.log("삭제 버튼 클릭");
 *   }}
 * />
 *
 * // 수정 기능만 비활성화
 * <Dropdown
 *   isEdit={false}
 *   onDelete={() => {
 *     console.log("삭제 버튼 클릭");
 *   }}
 * />
 *
 * // 전체 드롭다운 비활성화
 * <Dropdown
 *   isEnable={false}
 *   onEdit={() => {
 *     console.log("수정 버튼 클릭");
 *   }}
 *   onDelete={() => {
 *     console.log("삭제 버튼 클릭");
 *   }}
 * />
 * ```
 *
 * @param {object} props - Dropdown 컴포넌트의 속성
 * @param {boolean} [props.isEnable=true] - 드롭다운 전체 활성화 여부
 * @param {boolean} [props.isEdit=true] - 수정 버튼 활성화 여부
 * @param {() => void} [props.onEdit] - 수정 버튼 클릭 시 실행될 함수
 * @param {() => void} [props.onDelete] - 삭제 버튼 클릭 시 실행될 함수
 *
 * @returns {JSX.Element} 드롭다운 메뉴를 포함한 버튼 엘리먼트
 */

type DropdownProps = {
  isEnable?: boolean;
  isEdit?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function Dropdown({
  isEnable = true,
  isEdit = true,
  onEdit,
  onDelete,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    setOpen((value) => !value);
  }

  useEffect(() => {
    if (!open) return;

    // 바깥 클릭 시 닫기
    const onClose = (e: MouseEvent) => {
      const t = e.target;
      if (containerRef.current && !containerRef.current.contains(t as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClose);
    return () => document.removeEventListener("mousedown", onClose);
  }, [open]);

  return (
    <div ref={containerRef} className={twMerge("relative inline-flex select-none")}>
      <button
        type="button"
        onClick={handleToggle}
        className={twMerge(
          "inline-flex h-[24px] w-[24px] items-center justify-center rounded-[6px] transition-colors",
          "hover:bg-wh/15",
          "dark:hover:bg-bl/25",
          open && "bg-wh/15 dark:bg-bl/25",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        draggable={false}
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden />
      </button>

      {/* Menu */}
      {open && (
        // 버튼 컨테이너 영역
        <div
          role="menu"
          className={twMerge(
            "absolute right-0 z-[999] mt-[25px] flex flex-col",
            "min-w-[160px] rounded-[8px] border-[1px] px-[7px] py-[7px]",
            "bg-wh/30 border-wh/25",
            "dark:bg-bl/40 dark:border-wh/18",
          )}
          onClick={() => setOpen(false)}
        >
          {/* 버튼 영역 */}
          <ul>
            {isEdit && (
              <li>
                <button
                  type="button"
                  className={twMerge(
                    "inline-flex h-[37px] w-[146px] items-center justify-start gap-[10px]",
                    "label-text-s rounded-[6px] px-[12px] transition-colors",
                    "hover:bg-wh/20",
                    "dark:hover:bg-bl/40",
                    !isEnable && "pointer-events-none cursor-not-allowed disabled:opacity-40",
                  )}
                  aria-label="수정"
                  onClick={() => onEdit?.()}
                  draggable={false}
                  disabled={!isEnable}
                >
                  <SquarePen className="text-wh/75 h-4 w-4" aria-hidden />
                  <span className="text-wh">수정</span>
                </button>
              </li>
            )}

            <li>
              <button
                type="button"
                className={twMerge(
                  "inline-flex h-[37px] w-[146px] items-center justify-start gap-[10px]",
                  "label-text-s rounded-[6px] px-[12px] transition-colors",
                  "hover:bg-[#EF4444]/15",
                  "dark:hover:bg-[#EF4444]/15",
                  !isEnable && "pointer-events-none cursor-not-allowed disabled:opacity-40",
                )}
                aria-label="삭제"
                onClick={() => onDelete?.()}
                draggable={false}
                disabled={!isEnable}
              >
                <Trash className="h-4 w-4 text-[#EF4444]" aria-hidden />
                <span className="text-[#EF4444]">삭제하기</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
