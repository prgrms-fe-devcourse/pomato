import { cva } from "class-variance-authority";

export const itemVariants = cva(
  ["group flex cursor-pointer items-center justify-between rounded-[8px] px-[20px] py-[18px]"],
  {
    variants: {
      intent: {
        default:
          "bg-wh/4 dark:bg-bl/15 border-wh/6 hover:bg-wh/10 hover:border-wh/12 hover:dark:bg-bl/30 hover:dark:border-wh/10 active:bg-wh/15 active:border-wh/15 active:dark:bg-bl/40 active:dark:border-wh/12 border-1",
        danger:
          "bg-wh/4 dark:bg-bl/15 border-wh/6 hover:border-red-500/15 hover:bg-red-500/8 active:border-red-500/20 active:bg-red-500/12",
        disabled: "bg-wh/2 border-wh/4",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export const iconVariants = cva(
  ["flex h-[40px] w-[40px] items-center justify-center rounded-full"],
  {
    variants: {
      intent: {
        default: "bg-wh/15 group-hover:bg-wh/20 group-active:bg-wh/25 text-wh",
        danger: "bg-red-500/15 text-red-500 group-hover:bg-red-500/20 group-active:bg-red-500/25",
        disabled: "bg-wh/8 text-wh/40",
      },
    },
  },
);

export const nameVariants = cva(["label-text-m-semibold"], {
  variants: {
    intent: {
      default: "text-wh",
      danger: "text-red-500",
      disabled: "text-wh/50",
    },
  },
});

export const descriptionVariants = cva(["label-text-small"], {
  variants: {
    intent: {
      default: "text-wh/65 group-hover:text-wh/75 group-active:text-wh/80",
      danger: "text-red-500/70 group-hover:text-red-500/80 group-active:text-red-500/85",
      disabled: "text-wh/35",
    },
  },
});

export const chevronVariants = cva([], {
  variants: {
    intent: {
      default: "text-wh/50 group-hover:text-wh/70 group-active:text-wh/80",
      danger: "text-red-500/85 group-hover:text-red-500/75 group-active:text-red-500/85",
      disabled: "text-wh/30",
    },
  },
});
