import { useEffect, useState } from "react";

import { useTimerStore } from "./model/useTimerStore";
import ActiveUsersButton from "./ui/ActiveUsersButton";
import ControlButton from "./ui/ControlButton";
import ProgressBar from "./ui/ProgressBar";

export default function Timer() {
  const { currentTimerStatus } = useTimerStore();
  const [elapsedSec, setElapsedSec] = useState(0);
  // const startAt = useRef<number | null>(null);

  useEffect(() => {
    if (currentTimerStatus !== "RUNNING") return;

    const timer = setInterval(() => {
      setElapsedSec((state) => state + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [elapsedSec, currentTimerStatus]);

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto group-has-[section[aria-label='Panel']]:max-[800px]:hidden">
      {/*
      <div className="flex flex-col items-center justify-center gap-8">
        <img src="https://placehold.co/180x180" className="border-wh/20 rounded-xl border-2" />
        <div className="flex flex-col items-center gap-3">
          <header>
            <h2 className="text-wh/70 text-sm tracking-widest">{currentPhase}</h2>
          </header>
          <ol className="flex items-center gap-2" aria-label="세션 진행 단계">
            {Array.from({ length: totalSession }).map((_, index) => (
              <SessionDot
                key={index}
                status={
                  index < currentSession
                    ? "completed"
                    : index === currentSession && isRunning
                      ? "active"
                      : "default"
                }
              />
            ))}
          </ol>
        </div>
      </div>
      */}
      <ProgressBar elapsedSec={elapsedSec} />
      <ControlButton />
      <ActiveUsersButton />
    </section>
  );
}
