import type { LoaderFunctionArgs } from "react-router";

import { getMessages } from "@features/dm/api/message";
import { getMyChatRoomIds, getRoomInfoById } from "@features/dm/api/room";
import type { DmConversationTable } from "@features/dm/types/conversation.type";
import type { DmMessagesTable } from "@features/dm/types/messages.type";

export const dmLoader = async () => {
  return await getMyChatRoomIds();
};

export type MessageLoaderReturn = {
  messages: DmMessagesTable["Row"][];
  roomInfo: DmConversationTable | null;
};

export const messageLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<MessageLoaderReturn> => {
  if (!params.id) throw new Error("채팅방 id 존재하지 않음");
  const messages = await getMessages(params.id);
  const roomInfo = await getRoomInfoById(params.id);
  return { messages, roomInfo };
};
