import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useId, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  type?: "text" | "password" | "number" | "email";
  error?: boolean;
  id?: string;
  Icon?: LucideIcon;
  containerStyle?: string;
  innerStyle?: string;
}

/**
 *
 * 사용자 입력을 받는 기본 입력 컴포넌트입니다.
 * Tailwind 스타일이 적용되어 있으며,
 * 에러 상태, 아이콘 표시, 컨테이너/내부 커스텀 스타일 등을 지원합니다.
 *
 * @component
 *
 * @example
 * ```tsx
 * import {User} from "lucide-react";
 *
 * <Input
 *   id="username"
 *   placeholder="Enter your name"
 *   Icon={User}
 *   error={true}
 *   containerStyle="w-full"
 *   innerStyle="text-sm text-gray-900"
 *   iconStyle="text-gray-500"
 * />
 * ```
 *
 * @param {object} props - Input 컴포넌트의 속성
 * @param {"text" | "password" | "number" | "email"} [props.type="text"]
 *   입력 타입 (기본값: `"text"`)
 * @param {boolean} [props.error=false]
 *   에러 상태 여부. `true`일 경우 테두리가 빨간색으로 표시됩니다.
 * @param {string} [props.id]
 *   입력 필드의 고유 ID. 없을 경우 `useId()`로 자동 생성됩니다.
 * @param {React.ComponentType<React.SVGProps<SVGSVGElement>>} [props.Icon]
 *   아이콘 컴포넌트 (예: Lucide 아이콘). 왼쪽에 표시됩니다.
 * @param {string} [props.containerStyle]
 *   상위 `<label>` 컨테이너의 추가 Tailwind 클래스명
 * @param {string} [props.innerStyle]
 *   내부 `<input>` 요소의 추가 Tailwind 클래스명
 * @param {React.ComponentPropsWithoutRef<'input'>} [props.rest]
 *   나머지 HTML `<input>` 속성들 (예: `placeholder`, `value`, `onChange` 등)
 *
 * @returns {JSX.Element}
 *   스타일이 적용된 입력 필드 JSX 엘리먼트
 */
export default function Input({
  type = "text",
  error = false,
  id,
  Icon,
  containerStyle,
  innerStyle,
  value,
  disabled,
  className,
  ...rest
}: InputProps) {
  const inputId = useId();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isEmpty = !value || String(value).trim().length === 0;
  return (
    <label
      htmlFor={id || inputId}
      className={twMerge(
        "flex h-[40px] min-w-[260px] items-center gap-[14px] overflow-hidden rounded-[8px] border px-[16px]",
        "text-wh focus-within:bg-wh/25 focus-within:dark:bg-bl/40 focus-within:shadow-[0_0_0_2px_rgba(250,250,250,0.12)]",
        isEmpty ? "bg-wh/20 dark:bg-bl/30" : "bg-wh/30 dark:bg-bl/50",
        error
          ? "border-red-500/60 shadow-[0_0_0_2px_rgba(239,68,68,0.2)] focus-within:border-red-500/60"
          : "border-wh/15 dark:border-wh/12 focus-within:border-wh/30 dark:focus-within:border-wh/25",
        disabled && "bg-wh/10 dark:bg-bl/20 border-wh/10 dark:border-wh/8",
        className,
        containerStyle,
      )}
    >
      {Icon && (
        <Icon width={16} height={16} className={twMerge(disabled ? "text-wh/30" : "text-wh/70")} />
      )}
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        id={id || inputId}
        value={value}
        {...rest}
        disabled={disabled}
        className={twMerge(
          "text-wh placeholder:text-wh/50 label-text-s disabled:text-wh/30 flex-1 bg-transparent outline-none",
          innerStyle,
        )}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="flex items-center justify-center focus:outline-none"
        >
          {showPassword ? (
            <EyeOff width={16} height={16} className="text-wh/70" />
          ) : (
            <Eye width={16} height={16} className="text-wh/70" />
          )}
        </button>
      )}
    </label>
  );
}
