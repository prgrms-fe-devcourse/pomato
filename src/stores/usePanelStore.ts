import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type PanelState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;

  title: string;
  setTitle: (t: string) => void;
};

export const usePanelStore = create<PanelState>()(
  devtools(
    immer((set, get) => ({
      isOpen: false,

      open: () =>
        set((state) => {
          state.isOpen = true;
        }),

      close: () =>
        set((state) => {
          state.isOpen = false;
        }),

      toggle: () =>
        set((state) => {
          state.isOpen = !get().isOpen;
        }),

      title: "",

      setTitle: (title) =>
        set((state) => {
          state.title = title;
        }),
    })),
    { name: "PanelStore" },
  ),
);
