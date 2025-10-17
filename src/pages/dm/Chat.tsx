import ChatHeader from "@features/dm/ui/ChatHeader";
import ChatInput from "@features/dm/ui/ChatInput";
import ChatMessages from "@features/dm/ui/ChatMessages";

export default function Chat() {
  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
