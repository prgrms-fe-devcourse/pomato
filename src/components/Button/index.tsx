import { twMerge } from "tailwind-merge";

import { button, type ButtonVariants } from "./variants";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button">, ButtonVariants {}

/**
 * 공통 버튼 컴포넌트
 *
 * 버튼 스타일, 사이즈, 형태 등을 조합할 수 있도록 CVA를 활용해 구현했습니다.
 *
 * @component
 * @param {"button" | "submit" | "reset"} [type="button"] - 버튼 타입
 * @param {"glass" | "ghost" | "reveal" | "subtle" | "primary"} [intent="glass"] - 버튼 스타일 유형
 * @param {"lg" | "md" | "sm"} [size="lg"] - 버튼 크기
 * @param {"default" | "circle"} [shape="default"] - 버튼 형태: circle의 경우 iconOnly
 * @param {"iconOnly" | "iconText"} [composition="iconText"] - 아이콘/텍스트 조합 형태
 * @param {string} [className] - 추가 Tailwind 클래스
 * @param {React.ReactNode} children - 버튼 내부 콘텐츠
 * @param {React.MouseEventHandler<HTMLButtonElement>} [onClick] - 클릭 이벤트 핸들러
 * @returns {JSX.Element} 버튼 엘리먼트
 *
 * @example
 * ```tsx
 * <Button intent="primary" size="md" onClick={() => alert("clicked")}>
 *   <Plus /> 저장하기
 * </Button>
 * ```
 */

export default function Button({
  type = "button",
  intent = "glass",
  size = "lg",
  shape = "default",
  composition = "iconText",
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(button({ intent, size, shape, composition }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
