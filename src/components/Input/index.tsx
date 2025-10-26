import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { inputContainerVariants } from "@components/Input/variants";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "number" | "email";
  error?: boolean;
  id?: string;
  Icon?: IconType;
  containerStyle?: string;
}

type IconType = {
  Component: LucideIcon;
  align?: "left" | "right";
  onClick?: () => void;
};
/**
 * Input 컴포넌트
 *
 * 아이콘, 비밀번호 토글, 포커스 제어를 지원하는 범용 입력 컴포넌트입니다.
 *
 * - `text`, `password`, `number`, `email` 타입을 지원합니다.
 * - `error`, `disabled`, `empty` 상태에 따라 스타일이 동적으로 적용됩니다.
 * - 아이콘 클릭 시 `onClick`이 지정되어 있으면 해당 핸들러를 실행하고,
 *   지정되어 있지 않으면 기본적으로 input에 포커스를 부여합니다.
 * - `password` 타입일 경우 Eye/EyeOff 아이콘으로 비밀번호 표시 토글을 지원합니다.
 *
 * @component
 *
 * @example
 * ```tsx
 * import { Search } from "lucide-react";
 *
 * <Input
 *   placeholder="검색어를 입력하세요"
 *   Icon={{
 *     Component: Search,
 *     align: "left",
 *     // onClick이 없으면 아이콘 클릭 시 자동으로 포커스
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * import { User } from "lucide-react";
 *
 * <Input
 *   type="email"
 *   placeholder="이메일을 입력하세요"
 *   Icon={{
 *     Component: User,
 *     align: "right",
 *     onClick: () => console.log("아이콘 클릭됨"),
 *   }}
 *   containerStyle="w-full"
 * />
 * ```
 *
 * @param {object} props - Input 컴포넌트 속성
 * @param {"text" | "password" | "number" | "email"} [props.type="text"]
 *   입력 필드 타입입니다. `"password"`일 경우 비밀번호 표시 토글 버튼이 자동으로 렌더링됩니다.
 * @param {boolean} [props.error=false]
 *   에러 상태 여부입니다. `true`이면 테두리와 포커스 스타일이 빨간색으로 표시됩니다.
 * @param {string} [props.id]
 *   입력 필드의 고유 ID입니다.
 * @param {IconType} props.Icon
 *   아이콘 구성 객체입니다. 어떤 아이콘을 사용할지, 어디에 배치할지, 클릭 시 어떤 동작을 수행할지를 정의합니다.
 * @param {LucideIcon} props.Icon.Component
 *   Lucide 아이콘 컴포넌트 (예: `Search`, `User`, `Mail` 등)
 * @param {"left" | "right"} [props.Icon.align="left"]
 *   아이콘의 정렬 방향입니다. `"left"`는 왼쪽, `"right"`는 오른쪽에 표시됩니다.
 * @param {() => void} [props.Icon.onClick]
 *   아이콘 클릭 시 실행되는 함수입니다. 지정되지 않으면 기본적으로 input에 포커스를 줍니다.
 * @param {string} [props.containerStyle]
 *   최상위 `<div>` 컨테이너에 추가할 Tailwind 클래스명입니다.
 * @param {boolean} [props.disabled]
 *   입력 비활성화 여부입니다. `true`일 경우 상호작용이 비활성화되고 흐린 색상으로 표시됩니다.
 * @param {string | number | readonly string[]} [props.value]
 *   입력 값입니다.
 * @param {string} [props.className]
 *   `<input>` 요소에 적용할 추가 Tailwind 클래스명입니다.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [rest]
 *   추가적인 HTML `<input>` 속성 (예: `placeholder`, `onChange`, 등)
 *
 * @returns {JSX.Element}
 *   스타일과 인터랙션이 적용된 입력 필드 JSX 엘리먼트를 반환합니다.
 */
export default function Input({
  type = "text",
  error = false,
  Icon,
  containerStyle,
  className,
  value,
  disabled,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPassword = type === "password";
  const isEmpty = !value || String(value).trim().length === 0;
  const iconAlign = Icon?.align ?? "left";

  const handleIconClick = () => {
    if (disabled) return;
    if (Icon?.onClick) {
      Icon.onClick();
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={twMerge(
        inputContainerVariants({ empty: isEmpty, disabled, error }),
        iconAlign === "left" ? "flex-row" : "flex-row-reverse",
        containerStyle,
      )}
    >
      {Icon && (
        <button onClick={handleIconClick} type="button" tabIndex={-1}>
          <Icon.Component
            width={16}
            height={16}
            className={twMerge(disabled ? "text-wh/30" : "text-wh/70")}
          />
        </button>
      )}
      <div className="flex flex-1 items-center gap-1">
        <input
          ref={inputRef}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          {...rest}
          disabled={disabled}
          className={twMerge(
            "text-wh placeholder:text-wh/50 label-text-s disabled:text-wh/30 flex-1 bg-transparent outline-none",
            className,
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex cursor-pointer items-center justify-center focus:outline-none"
          >
            {showPassword ? (
              <EyeOff width={16} height={16} className="text-wh/70" />
            ) : (
              <Eye width={16} height={16} className="text-wh/70" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
