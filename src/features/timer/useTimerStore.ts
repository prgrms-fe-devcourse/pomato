import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TimerStoreState = {
  config: {
    focusMin: number;
    breakMin: number;
    longBreakMin: number;
    totalSession: number;
  };
};

type TimeStoreActions = {
  setConfig: (config: TimerStoreState) => void;
};

type TimeStore = TimerStoreState & TimeStoreActions;

export const useTimerStore = create<TimeStore>()(
  devtools(
    immer((set) => ({
      config: {
        focusMin: 25,
        breakMin: 5,
        longBreakMin: 15,
        totalSession: 4,
      },
      setConfig: ({ config }) =>
        set((state) => {
          state.config = config;
        }),
    })),
  ),
);
