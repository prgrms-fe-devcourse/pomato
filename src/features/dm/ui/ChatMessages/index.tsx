import ChatBubble from "@features/dm/ui/ChatBubble";

export default function ChatMessages() {
  return (
    <div className="flex-1 px-[16px]">
      <ChatBubble isMine={false} />
      <ChatBubble />
    </div>
  );
}
