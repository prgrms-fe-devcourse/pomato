import { create } from "zustand";

import type { DmMessagesTable } from "@features/dm/types/messages.type";

type ChatState<T> = {
  messages: T[];
  setMessages: (message: T[]) => void;
  addMessage: (message: T) => void;
};

export const useChatStore = create<ChatState<DmMessagesTable["Row"]>>()((set, get) => ({
  messages: [],
  setMessages: (messages: DmMessagesTable["Row"][]) => set({ messages: messages }),
  addMessage: (message) => {
    const prev = get().messages;
    set({ messages: [...prev, message] });
  },
}));
