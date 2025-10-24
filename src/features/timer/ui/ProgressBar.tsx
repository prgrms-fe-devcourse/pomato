import { toMMSS } from "@utils/formatTime";

export default function ProgressBar({
  elapsedSec,
  totalSec,
}: {
  elapsedSec: number;
  totalSec: number;
}) {
  const progressPercent = (elapsedSec / totalSec) * 100;

  return (
    <div className="flex items-center justify-center gap-2 text-xs">
      <span className="text-wh/70 cursor-default tabular-nums">{toMMSS(elapsedSec)}</span>
      <div className="bg-wh/15 dark:bg-bl/10 relative h-1 w-50 flex-1 rounded-full">
        <div
          className="bg-wh dark:bg-bl/45 absolute h-1 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <span className="text-wh/70 cursor-default tabular-nums">{toMMSS(totalSec)}</span>
    </div>
  );
}
