import type { LoaderFunctionArgs } from "react-router";

import { getMessages } from "@features/dm/api/message";
import { getMyChatRoomIds } from "@features/dm/api/room";

export const dmLoader = async () => {
  return await getMyChatRoomIds();
};

export const messageLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) throw new Error("채팅방 id 존재하지 않음");
  return await getMessages(params.id);
};
