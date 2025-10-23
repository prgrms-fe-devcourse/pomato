import { useEffect, useRef } from "react";

import { useChatStore } from "@features/dm/store/useChatStore";
import ChatBubble from "@features/dm/ui/ChatBubble";
import { useUserId } from "@stores/useAuthStore";

export default function ChatMessages() {
  const messages = useChatStore((state) => state.messages);
  const id = useUserId();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-[12px] overflow-y-auto p-[16px]">
      {messages.map((message, index) => (
        <ChatBubble
          key={message.id}
          text={message.content}
          isMine={id === message.sender_id}
          time={message.created_at}
          isRead={
            (id === message.sender_id && index === messages.length - 1 && message.is_read) ?? false
          }
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
