import { useChatStore } from "@features/dm/store/useChatStore";
import ChatBubble from "@features/dm/ui/ChatBubble";
import { useUserId } from "@stores/useAuthStore";

export default function ChatMessages() {
  const messages = useChatStore((state) => state.messages);
  const id = useUserId();
  return (
    <div className="pc-scroll min-h-0 flex-1 overflow-y-auto">
      <section className="flex flex-col">
        {messages.map((message, index) => {
          return (
            <ChatBubble
              key={message.id}
              text={message.content}
              isMine={id === message.sender_id}
              time={message.created_at}
              isRead={
                (id === message.sender_id && index === messages.length - 1 && message.is_read) ??
                false
              }
            />
          );
        })}
      </section>
    </div>
  );
}
