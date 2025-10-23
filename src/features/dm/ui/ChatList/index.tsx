/* eslint-disable unicorn/no-array-sort */
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

import EmptyState from "@components/Empty";
import { useConversationChannel } from "@features/dm/hook/useConversationChannel";
import { useDmRoomStore } from "@features/dm/store/useRoomStore";
import ChatCard from "@features/dm/ui/ChatCard";
import { roomSort } from "@features/dm/util/roomSort";
import { getOtherUser } from "@features/user/util/user";

export type ChatListProps = {
  userId: string;
};

export default function ChatList({ userId }: ChatListProps) {
  const navigate = useNavigate();
  const rooms = useDmRoomStore((state) => state.rooms);
  useConversationChannel(userId);
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
    <ul className="flex flex-col gap-[4px]">
      {rooms.sort(roomSort).map((room) => {
        return (
          <li key={room.id} id={room.id} onClick={() => void navigate(`${room.id}`)}>
            <ChatCard
              message={room.message}
              userId={getOtherUser(userId, room.user_a, room.user_b)}
              unreadCount={room.unreadCount}
              lastMessageTime={room.lastMessageTime}
            />
          </li>
        );
      })}
    </ul>
  );
}
