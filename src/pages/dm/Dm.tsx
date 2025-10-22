import { MessageCircle, Search } from "lucide-react";
import { useLoaderData } from "react-router";

import EmptyState from "@components/Empty";
import Input from "@components/Input";
import type { GetMyChatRoomIdsReturn } from "@features/dm/api/room";
import ChatList from "@features/dm/ui/ChatList";
import { useUserId } from "@stores/useAuthStore";

export default function Dm() {
  const { rooms } = useLoaderData<GetMyChatRoomIdsReturn>();
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
  if (rooms.length === 0)
    return (
      <div className="flex flex-1 overflow-hidden p-[16px]">
        <EmptyState
          title="메세지가 없습니다"
          description="아직 주고받은 메세지가 없습니다"
          Icon={MessageCircle}
          className="border-wh/6 rounded-[12px] border-1"
        />
      </div>
    );
  return (
    <div className="flex flex-col gap-[12px] p-[16px]">
      <Input Icon={{ Component: Search, align: "right" }} placeholder="검색어를 입력하세요..." />
      <ChatList rooms={rooms} userId={id} />
    </div>
  );
}
