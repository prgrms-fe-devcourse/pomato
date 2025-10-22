import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TimerStoreState = {
  focusMin: number;
  breakMin: number;
  longBreakMin: number;
  totalSession: number;
};

type TimerStoreActions = {
  setFocusMin: (min: number) => void;
  setBreakMin: (min: number) => void;
  setLongBreakMin: (min: number) => void;
  setTotalSession: (count: number) => void;
};

type TimerStore = TimerStoreState & TimerStoreActions;

export const useTimerStore = create<TimerStore>()(
  devtools(
    immer((set) => ({
      // focusMin: 25,
      // breakMin: 5,
      // longBreakMin: 15,
      focusMin: 1,
      breakMin: 1,
      longBreakMin: 1,
      totalSession: 4,

      setFocusMin: (min) =>
        set((state) => {
          state.focusMin = Math.max(0, min);
        }),
      setBreakMin: (min) =>
        set((state) => {
          state.breakMin = Math.max(0, min);
        }),
      setLongBreakMin: (min) =>
        set((state) => {
          state.longBreakMin = Math.max(0, min);
        }),
      setTotalSession: (count) =>
        set((state) => {
          state.totalSession = Math.max(1, count);
        }),
    })),
  ),
);

export const useFocusMin = () => useTimerStore((state) => state.focusMin);
export const useBreakMin = () => useTimerStore((state) => state.breakMin);
export const useLongBreakMin = () => useTimerStore((state) => state.longBreakMin);
export const useTotalSession = () => useTimerStore((state) => state.totalSession);
