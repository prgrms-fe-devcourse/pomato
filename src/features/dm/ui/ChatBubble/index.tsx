import { twMerge } from "tailwind-merge";

import { ChatBubbleVariants } from "@features/dm/ui/ChatBubble/variants";

type ChatBubbleType = {
  text: string;
  isMine?: boolean;
};

export default function ChatBubble({ isMine = true, text }: ChatBubbleType) {
  return (
    <div className={twMerge("flex flex-col gap-[6px]", isMine ? "items-end" : "items-start")}>
      <div className={ChatBubbleVariants({ isMine })}>{text}</div>
      <span className="label-text-xs text-wh/60">2:34 PM</span>
    </div>
  );
}
