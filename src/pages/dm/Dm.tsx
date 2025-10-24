import { MessageCircle } from "lucide-react";

import EmptyState from "@components/Empty";
import ChatConversationProvider from "@features/dm/ui/ChatConversationProvider";
import ChatList from "@features/dm/ui/ChatList";
import { useUserId } from "@stores/useAuthStore";

export default function Dm() {
  const id = useUserId();
  if (!id)
    return (
      <div className="flex flex-1 overflow-hidden p-[16px]">
        <EmptyState
          title="로그인이 필요합니다"
          description="메시지를 보내려면 로그인하세요"
          Icon={MessageCircle}
          className="border-wh/6 rounded-[12px] border-1"
        />
      </div>
    );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChatConversationProvider userId={id}>
        <ChatList userId={id} />
      </ChatConversationProvider>
    </div>
  );
}
