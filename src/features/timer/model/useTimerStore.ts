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
  completePhase: () => void;
};

type TimerStore = TimerStoreState & TimerStoreActions;

export const useTimerStore = create<TimerStore>()(
  devtools(
    immer((set) => ({
      // focusMin: 25,
      // breakMin: 5,
      // longBreakMin: 15,
      // totalSession: 4,

      focusMin: 1,
      breakMin: 2,
      longBreakMin: 1,
      totalSession: 2,

      currentPhase: "FOCUS",
      currentTimerStatus: "IDLE",
      currentSession: 0,

      setFocusMin: (min) =>
        set((state) => {
          state.focusMin = Math.max(1, min);
        }),
      setBreakMin: (min) =>
        set((state) => {
          state.breakMin = Math.max(1, min);
        }),
      setLongBreakMin: (min) =>
        set((state) => {
          state.longBreakMin = Math.max(1, min);
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
          state.currentTimerStatus = "IDLE";
        }),
      skip: () =>
        set((state) => {
          state.currentTimerStatus = "PAUSED";
          switch (state.currentPhase) {
            case "FOCUS": {
              state.currentSession = state.currentSession + 1;
              const isLast = state.currentSession === state.totalSession;
              state.currentPhase = isLast ? "LONG BREAK" : "BREAK";
              break;
            }
            case "BREAK": {
              state.currentPhase = "FOCUS";
              break;
            }
            case "LONG BREAK": {
              state.currentPhase = "FOCUS";
              state.currentSession = 0;
              break;
            }
          }
        }),
      completePhase: () =>
        set((state) => {
          state.currentTimerStatus = "PAUSED";
          switch (state.currentPhase) {
            case "FOCUS": {
              state.currentSession = state.currentSession + 1;
              const isLast = state.currentSession === state.totalSession;
              state.currentPhase = isLast ? "LONG BREAK" : "BREAK";
              break;
            }
            case "BREAK": {
              state.currentPhase = "FOCUS";
              break;
            }
            case "LONG BREAK": {
              state.currentPhase = "FOCUS";
              state.currentSession = 0;
              break;
            }
          }
        }),
    })),
    { name: "TimeStore" },
  ),
);

export const getTotalSeconds = (
  phase: Phase,
  store: Pick<TimerStore, "focusMin" | "breakMin" | "longBreakMin">,
): number => {
  switch (phase) {
    case "FOCUS": {
      return store.focusMin * 60;
    }
    case "BREAK": {
      return store.breakMin * 60;
    }
    case "LONG BREAK": {
      return store.longBreakMin * 60;
    }
    default: {
      return 0;
    }
  }
};

export const useTotalSeconds = (): number => {
  const { currentPhase, focusMin, breakMin, longBreakMin } = useTimerStore();
  return getTotalSeconds(currentPhase, { focusMin, breakMin, longBreakMin });
};
