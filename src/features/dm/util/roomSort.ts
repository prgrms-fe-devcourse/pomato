// utils/roomSort.ts
import type { DmConversationTable } from "@features/dm/types/conversation.type";

export const roomSort = (
  a: DmConversationTable & { lastMessageTime?: string },
  b: DmConversationTable & { lastMessageTime?: string },
): number => {
  if (!a.lastMessageTime && !b.lastMessageTime) return 0;
  if (!a.lastMessageTime) return 1;
  if (!b.lastMessageTime) return -1;

  return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
};
