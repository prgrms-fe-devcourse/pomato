import { toMMSS } from "@utils/formatTime";

import { useTimerStore } from "../model/useTimerStore";

export default function ProgressBar({ elapsedSec }: { elapsedSec: number }) {
  const { focusMin } = useTimerStore();
  const progressPercent = (elapsedSec / (focusMin * 60)) * 100;

  return (
    <div className="flex items-center justify-center gap-2 text-xs">
      <span className="text-wh/70 cursor-default tabular-nums">{toMMSS(elapsedSec)}</span>
      <div className="bg-wh/15 dark:bg-bl/10 relative h-1 w-50 flex-1 rounded-full">
        <div
          className="bg-wh dark:bg-bl/45 absolute h-1 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <span className="text-wh/70 cursor-default tabular-nums">{toMMSS(focusMin * 60)}</span>
    </div>
  );
}
