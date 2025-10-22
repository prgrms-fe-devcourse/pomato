import { useEffect, useState } from "react";

import ActiveUsersButton from "./ui/ActiveUsersButton";
import ControlButton from "./ui/ControlButton";
import ProgressBar from "./ui/ProgressBar";
import { useTimerStore } from "./useTimerStore";
import { dot } from "./variants";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const handleTogglePlay = () => setIsRunning((prev) => !prev);
  const { focusMin } = useTimerStore();
  const [remainingSec, setRemainingSec] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setRemainingSec((state) => (state += 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto group-has-[section[aria-label='Panel']]:max-[800px]:hidden">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src="https://placehold.co/180x180" className="border-wh/20 rounded-xl border-2" />
        <div className="flex flex-col items-center gap-3">
          <header>
            <h2 className="text-wh/70 text-sm tracking-widest">{"FOCUS"}</h2>
          </header>
          <ol className="flex items-center gap-2" aria-label="세션 진행 단계">
            <li>
              <div className={dot({ status: "completed" })} />
            </li>
            <li>
              <div className={dot({ status: "active" })} />
            </li>
            <li>
              <div className={dot({ status: "default" })} />
            </li>
            <li>
              <div className={dot({ status: "default" })} />
            </li>
          </ol>
        </div>
      </div>
      <ProgressBar focusMin={focusMin * 60} remainingSec={remainingSec} />
      <ControlButton isRunning={isRunning} onToggle={handleTogglePlay} />
      <ActiveUsersButton />
    </section>
  );
}
