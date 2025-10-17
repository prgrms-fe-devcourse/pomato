import { cva } from "class-variance-authority";

export const ChatBubbleVariants = cva(["paragraph-text-s max-w-[280px] px-[16px] py-[12px]"], {
  variants: {
    isMine: {
      true: "rounded-[18px] rounded-br-[4px] bg-blue-500",
      false:
        "bg-wh/20 border-wh/15 dark:bg-bl/20 dark:border-wh/12 rounded-[18px] rounded-bl-[4px] border-1",
    },
  },
});
