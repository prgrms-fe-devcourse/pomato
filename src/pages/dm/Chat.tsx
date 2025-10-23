import { useParams } from "react-router";

import { useRoomChannel } from "@features/dm/hook/useRoomChannel";
import ChatHeader from "@features/dm/ui/ChatHeader";
import ChatInput from "@features/dm/ui/ChatInput";
import ChatMessages from "@features/dm/ui/ChatMessages";
import { useUserId } from "@stores/useAuthStore";

export default function Chat() {
  const id = useUserId();
  const params = useParams();

  if (!id || !params.id) {
    throw new Error("로그인을 확인할 수 없습니다.");
  }

  const { sendMessages } = useRoomChannel(params.id);

  const handleSendMessage = (message: string) => {
    void sendMessages({
      content: message,
      conversation_id: params.id as string,
      sender_id: id,
    });
  };

  return (
    <div className="pc-scroll min-h-0 flex-1 overflow-y-auto">
      <ChatHeader conversationId={params.id} userId={id} />
      <ChatMessages />
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
}
