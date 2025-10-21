import { useNavigate } from "react-router";

import type { DmConversationTable } from "@features/dm/types/conversation.type";
import ChatCard from "@features/dm/ui/ChatCard";
import { getOtherUser } from "@features/user/util/user";

export type ChatListProps = {
  rooms: DmConversationTable[];
  userId: string;
};

export default function ChatList({ rooms = [], userId }: ChatListProps) {
  const navigate = useNavigate();
  return (
    <ul className="flex flex-col gap-[4px]">
      {rooms.map((room) => {
        return (
          <li key={room.id} id={room.id} onClick={() => void navigate(`${room.id}`)}>
            <ChatCard message="message" userId={getOtherUser(userId, room.user_a, room.user_b)} />
          </li>
        );
      })}
    </ul>
  );
}
