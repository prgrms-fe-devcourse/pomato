import { useLoaderData } from "react-router";

import type { DmMessagesTable } from "@features/dm/types/messages.type";
import ChatHeader from "@features/dm/ui/ChatHeader";
import ChatInput from "@features/dm/ui/ChatInput";
import ChatMessages from "@features/dm/ui/ChatMessages";

export default function Chat() {
  const messages = useLoaderData<DmMessagesTable["Row"][]>();
  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />
      <ChatMessages messages={messages} />
      <ChatInput />
    </div>
  );
}
