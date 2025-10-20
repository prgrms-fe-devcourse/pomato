import { useNavigate } from "react-router";

import type { DmConversationTable } from "@features/dm/types/conversation.type";
import ChatCard from "@features/dm/ui/ChatCard";

export type ChatListProps = {
  rooms: DmConversationTable[];
};

export default function ChatList({ rooms = [] }: ChatListProps) {
  const navigate = useNavigate();
  return (
    <ul className="flex flex-col gap-[4px]">
      {rooms.map((value) => {
        return (
          <li key={value.id} id={value.id} onClick={() => void navigate(`${value.id}`)}>
            <ChatCard name="Sera" message="message" />
          </li>
        );
      })}
    </ul>
  );
}
