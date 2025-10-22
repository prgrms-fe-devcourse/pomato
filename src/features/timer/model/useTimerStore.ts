import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type { Phase, TimerStatus } from "../types/timer.types";

type TimerStoreState = {
  focusMin: number;
  breakMin: number;
  longBreakMin: number;
  totalSession: number;
  currentPhase: Phase;
  currentTimerStatus: TimerStatus;
  currentSession: number;
};

type TimerStoreActions = {
  setFocusMin: (min: number) => void;
  setBreakMin: (min: number) => void;
  setLongBreakMin: (min: number) => void;
  setTotalSession: (count: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  // completePhase: () => void;
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
      currentPhase: "FOCUS",
      currentTimerStatus: "IDLE",
      currentSession: 0,

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
      start: () =>
        set((state) => {
          state.currentTimerStatus = "RUNNING";
        }),
      pause: () =>
        set((state) => {
          state.currentTimerStatus = "PAUSED";
        }),
      resume: () =>
        set((state) => {
          state.currentTimerStatus = "RUNNING";
        }),
      reset: () =>
        set((state) => {
          state.currentPhase = "FOCUS";
          state.currentTimerStatus = "IDLE";
        }),
      skip: () =>
        set((state) => {
          state.currentSession += 1;
        }),
      // completePhase: () => set((state) => {}),
    })),
  ),
);

export const useFocusMin = () => useTimerStore((state) => state.focusMin);
export const useBreakMin = () => useTimerStore((state) => state.breakMin);
export const useLongBreakMin = () => useTimerStore((state) => state.longBreakMin);
export const useTotalSession = () => useTimerStore((state) => state.totalSession);
