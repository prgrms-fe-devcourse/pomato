import { Send } from "lucide-react";

import Input from "@components/Input";

export default function ChatInput() {
  return (
    <div className="border-wh/15 flex h-[68px] items-center gap-[8px] border-t-1 px-[16px]">
      <Input id="chat-input" containerStyle="flex-1" placeholder="Write a message..." />
      <button className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-blue-500">
        <Send width={16} height={16} />
      </button>
    </div>
  );
}
