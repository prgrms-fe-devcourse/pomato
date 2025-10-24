import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "group/toast flex w-full max-w-xs items-center gap-3 rounded-xl border px-3.5 py-3",
    "backdrop-blur-md backdrop-saturate-150 transition-colors select-none",
    "bg-wh/12 dark:bg-bl/20 border-wh/10 dark:border-wh/12",
    "hover:bg-wh/18 hover:dark:bg-bl/30 focus-within:bg-wh/18 focus-within:dark:bg-bl/30",
    "shadow-[0_3px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_3px_8px_rgba(0,0,0,0.10)]",
  ],
  {
    variants: {
      intent: {
        info: "",
        success: "",
        warning: "",
        error: "",
      },
      position: {
        "bottom-right": "fixed right-8 bottom-8 z-50",
        "bottom-left": "fixed bottom-8 left-8 z-50",
        "top-right": "fixed top-8 right-8 z-50",
        "top-left": "fixed top-8 left-8 z-50",
        center: "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      intent: "info",
      position: "bottom-right",
    },
  },
);
