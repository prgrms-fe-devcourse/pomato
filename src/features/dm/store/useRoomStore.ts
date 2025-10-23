import { create } from "zustand";

import type { DmConversationTable } from "@features/dm/types/conversation.type";

type RoomExpandType = {
  message: string;
  unreadCount: number;
  lastMessageTime: string;
};

type ChatState<T> = {
  rooms: T[];
  setRooms: (rooms: T[]) => void;
  updateRoom: (roomId: string, partial: Partial<T>) => void;
};

export const useDmRoomStore = create<ChatState<DmConversationTable & RoomExpandType>>()(
  (set, get) => ({
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    updateRoom: (roomId, partial) => {
      const updated = get().rooms.map((r) => (r.id === roomId ? { ...r, ...partial } : r));
      set({ rooms: updated });
    },
  }),
);
