import { useEffect } from "react";
import { useLoaderData } from "react-router";

import { useRoomChannel } from "@features/dm/hook/useRoomChannel";
import type { MessageLoaderReturn } from "@features/dm/model/loader";
import { useChatStore } from "@features/dm/store/useChatStore";
import ChatHeader from "@features/dm/ui/ChatHeader";
import ChatInput from "@features/dm/ui/ChatInput";
import ChatMessages from "@features/dm/ui/ChatMessages";
import { getOtherUser } from "@features/user/util/user";
import { useUserId } from "@stores/useAuthStore";

export default function Chat() {
  const id = useUserId();
  const { messages, roomInfo } = useLoaderData<MessageLoaderReturn>();

  if (id === undefined) {
    throw new Error("로그인을 확인할 수 없습니다.");
  }
  if (roomInfo === null) {
    throw new Error("채팅방 정보를 가져올 수 없습니다");
  }

  const addMessage = useChatStore((state) => state.addMessage);
  const setMessages = useChatStore((state) => state.setMessages);
  const { sendMessages } = useRoomChannel(roomInfo.id, addMessage);

  useEffect(() => {
    setMessages(messages); // 기존 채팅 내역 불러오기
  }, [messages, setMessages]);

  const handleSendMessage = (message: string) => {
    void sendMessages({
      content: message,
      conversation_id: roomInfo.id,
      sender_id: id,
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader partnerId={getOtherUser(id, roomInfo.user_a, roomInfo.user_b)} />
      <ChatMessages />
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
}
