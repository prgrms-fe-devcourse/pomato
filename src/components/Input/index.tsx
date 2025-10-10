import type { InputProps } from "@components/Input/type";
import { useId } from "react";
import { twMerge } from "tailwind-merge";

export default function Input({
  type = "text",
  error = false,
  id,
  Icon,
  containerStyle,
  innerStyle,
  iconStyle,
  ...rest
}: InputProps) {
  const inputId = useId();

  return (
    <label
      htmlFor={id || inputId}
      className={twMerge(
        "flex h-[40px] items-center gap-[14px] rounded-[8px] border px-[16px]",
        "text-wh bg-wh/2 dark:bg-bl/30 placeholder-wh/50 hover:bg-wh/25 hover:dark:bg-bl/40 hover:drop-shadow-wh/20",
        "focus-within:bg-wh/30 focus-within:dark:bg-bl/40 disabled:bg-wh/10 disabled:dark:bg-bl/20 disabled:border-wh/10 disabled:dark:border-wh/8 label-text-s",
        error
          ? "border-red-500/60 focus-within:border-red-500/60 hover:border-red-500/60"
          : "border-wh/15 dark:border-wh/12 hover:border-wh/30 dark:hover:border-wh/25 focus-within:border-wh/25 dark:focus-within:border-wh/18",
        containerStyle,
      )}
    >
      {Icon && (
        <Icon
          width={16}
          height={16}
          className={twMerge("text-wh/60 group-focus-within:text-wh", iconStyle)}
        />
      )}
      <input
        type={type}
        id={id || inputId}
        {...rest}
        className={twMerge(
          "text-wh placeholder-wh/50 flex-1 bg-transparent outline-none",
          innerStyle,
        )}
      />
    </label>
  );
}
