import { useNavigate } from "react-router";

import ChatCard from "@features/dm/ui/ChatCard";

export default function ChatList() {
  const navigate = useNavigate();
  return (
    <ul className="flex flex-col gap-[4px]">
      <li onClick={() => void navigate("123")}>
        <ChatCard name="Sera" message="message" />
      </li>
    </ul>
  );
}
