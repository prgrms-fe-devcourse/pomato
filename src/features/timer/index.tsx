import { useEffect, useRef, useState } from "react";

import { getTotalSeconds, useTimerStore } from "./model/useTimerStore";
import ActiveUsersButton from "./ui/ActiveUsersButton";
import AudioVisualizer from "./ui/AudioVisualizer";
import BgMusic from "./ui/BackgroundMusic";
import ControlButton from "./ui/ControlButton";
import ProgressBar from "./ui/ProgressBar";
import SessionDot from "./ui/SessionDot";
import VinylRecord from "./ui/VinylRecord";

export default function Timer() {
  const {
    currentTimerStatus,
    currentPhase,
    totalSession,
    currentSession,
    completePhase,
    focusMin,
    breakMin,
    longBreakMin,
  } = useTimerStore();

  const [elapsedSec, setElapsedSec] = useState(0);
  const [totalSec, setTotalSec] = useState(
    getTotalSeconds(currentPhase, { focusMin, breakMin, longBreakMin }),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const startAt = useRef<number>(0);
  const elapsedSecRef = useRef<number>(0);

  useEffect(() => {
    elapsedSecRef.current = elapsedSec;
  }, [elapsedSec]);

  useEffect(() => {
    setTotalSec(getTotalSeconds(currentPhase, { focusMin, breakMin, longBreakMin }));
    setElapsedSec(0);
    startAt.current = 0;
  }, [currentPhase, focusMin, breakMin, longBreakMin]);

  useEffect(() => {
    if (currentTimerStatus === "IDLE") {
      setElapsedSec(0);
      startAt.current = 0;
      return;
    }

    if (currentTimerStatus !== "RUNNING") {
      startAt.current = 0;
      return;
    }

    if (startAt.current === 0) {
      startAt.current = Date.now() - elapsedSecRef.current * 1000;
    }

    const timer = setInterval(() => {
      const nowTimer = Math.floor((Date.now() - startAt.current) / 1000);

      if (nowTimer >= totalSec) {
        clearInterval(timer);
        startAt.current = 0;
        setElapsedSec(totalSec);
        completePhase();
      } else {
        setElapsedSec(nowTimer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTimerStatus, totalSec, completePhase]);

  const handleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto group-has-[section[aria-label='Panel']]:max-[800px]:hidden">
      <div className="flex flex-col items-center justify-center gap-8">
        <div onClick={handleMusic} className="flex flex-col gap-7">
          <BgMusic isPlaying={isPlaying} />
          <AudioVisualizer isPlaying={isPlaying} />
          <VinylRecord isPlaying={isPlaying} />
        </div>
        <div className="flex flex-col items-center gap-3">
          <header>
            <h2 className="text-wh/70 text-lg tracking-widest">{currentPhase}</h2>
          </header>
          <ol className="flex items-center gap-3" aria-label="세션 진행 단계">
            {Array.from({ length: totalSession }).map((_, index) => (
              <SessionDot
                key={`${totalSession}-${index}`}
                status={
                  index < currentSession
                    ? "completed"
                    : currentPhase === "FOCUS" &&
                        ["RUNNING", "PAUSED"].includes(currentTimerStatus) &&
                        index === currentSession
                      ? "active"
                      : "default"
                }
              />
            ))}
          </ol>
        </div>
      </div>
      <ProgressBar elapsedSec={elapsedSec} totalSec={totalSec} />
      <ControlButton />
      <ActiveUsersButton />
    </section>
  );
}
