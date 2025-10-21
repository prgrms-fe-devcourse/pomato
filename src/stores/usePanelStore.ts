import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type PanelState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  title: string;
  setTitle: (title: string) => void;
};

export const usePanelStore = create<PanelState>()(
  devtools(
    immer((set) => ({
      isOpen: false,

      open: () =>
        set((state) => {
          state.isOpen = true;
        }),

      close: () =>
        set((state) => {
          state.isOpen = false;
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

export const usePanelTitle = () => usePanelStore((state) => state.title);
export const useIsPanelOpen = () => usePanelStore((state) => state.isOpen);
