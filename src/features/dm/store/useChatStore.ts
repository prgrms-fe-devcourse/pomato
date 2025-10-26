import { create } from "zustand";

import type { DmMessagesTable } from "@features/dm/types/messages.type";

type ChatState<T> = {
  messages: T[];
  setMessages: (message: T[]) => void;
  addMessage: (message: T) => void;
};

export const useChatStore = create<ChatState<DmMessagesTable["Row"]>>()((set) => ({
  messages: [],
  setMessages: (messages: DmMessagesTable["Row"][]) => set({ messages: messages }),
  addMessage: (message) => {
    set((state) => {
      const exists = state.messages.some((m) => m.id === message.id);
      if (exists) return state; // 이미 존재하면 변경하지 않음

      return { messages: [...state.messages, message] };
    });
  },
}));
