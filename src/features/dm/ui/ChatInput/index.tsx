import { Send } from "lucide-react";
import { useState } from "react";

import Input from "@components/Input";

type ChatInputProps = {
  sendMessage: (message: string) => void;
};

export default function ChatInput({ sendMessage }: ChatInputProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    void sendMessage(value);
    setValue("");
  };

  return (
    <form className="border-wh/15 flex h-[68px] items-center gap-[8px] border-t-1 px-[16px]">
      <Input
        id="chat-input"
        containerStyle="flex-1"
        placeholder="Write a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-blue-500"
        onClick={(e) => handleSubmit(e)}
      >
        <Send width={16} height={16} />
      </button>
    </form>
  );
}
