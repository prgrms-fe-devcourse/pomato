import type { DmMessagesTable } from "@features/dm/types/messages.type";
import ChatBubble from "@features/dm/ui/ChatBubble";

export type ChatMessagesProps = {
  messages: DmMessagesTable["Row"][];
};

export default function ChatMessages({ messages = [] }: ChatMessagesProps) {
  return (
    <div className="flex-1 px-[16px]">
      {messages.map((message) => {
        return <ChatBubble key={message.id} text={message.content} />;
      })}
    </div>
  );
}
