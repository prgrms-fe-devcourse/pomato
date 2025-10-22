import { useLoaderData } from "react-router";

import type { MessageLoaderReturn } from "@features/dm/model/loader";
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
  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader partnerId={getOtherUser(id, roomInfo.user_a, roomInfo.user_b)} />
      <ChatMessages messages={messages} />
      <ChatInput />
    </div>
  );
}
