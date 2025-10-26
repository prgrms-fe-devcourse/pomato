import { cva } from "class-variance-authority";

export const inputContainerVariants = cva(
  [
    "flex h-10 min-w-[260px] items-center gap-3.5 overflow-hidden rounded-lg border px-4",
    "text-wh focus-within:bg-wh/25 focus-within:dark:bg-bl/40 transition-colors focus-within:shadow-[0_0_0_2px_rgba(250,250,250,0.12)]",
  ],
  {
    variants: {
      empty: {
        true: "bg-wh/20 dark:bg-bl/30",
        false: "bg-wh/30 dark:bg-bl/50",
      },
      error: {
        true: "border-red-500/60 shadow-[0_0_0_2px_rgba(239,68,68,0.2)] focus-within:border-red-500/60",
        false:
          "border-wh/15 dark:border-wh/12 focus-within:border-wh/30 dark:focus-within:border-wh/25",
      },
      disabled: {
        true: "bg-wh/10 dark:bg-bl/20 border-wh/10 dark:border-wh/8 cursor-not-allowed opacity-60",
        false: "",
      },
    },
    compoundVariants: [
      {
        error: true,
        disabled: true,
        class: "cursor-not-allowed border-red-500/30 opacity-50",
      },
    ],
    defaultVariants: {
      empty: false,
      error: false,
      disabled: false,
    },
  },
);
