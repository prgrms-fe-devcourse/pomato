import { cva } from "class-variance-authority";

export const dot = cva(
  "focus-visible:ring-wh/12 h-2 w-2 rounded-full border transition-all duration-500 ease-in-out outline-none focus-visible:ring-2",
  {
    variants: {
      status: {
        default: ["bg-wh/10 border-wh/20", "dark:bg-bl/20 dark:border-wh/8"],
        active: ["bg-wh/30 border-wh/30", "dark:bg-bl/40 dark:border-wh/18 w-7.5"],
        completed: ["bg-wh/50 border-wh/40", "dark:bg-bl/60 dark:border-wh/25"],
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);
