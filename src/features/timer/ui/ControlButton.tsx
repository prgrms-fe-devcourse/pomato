import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

import Button from "@components/Button";

import { useTimerStore } from "../model/useTimerStore";

export default function ControlButton() {
  const { start, pause, reset, skip, currentTimerStatus } = useTimerStore();

  return (
    <div className="flex items-center gap-3" aria-label="타이머 컨트롤 버튼">
      <Button
        onClick={reset}
        shape="circle"
        intent="reveal"
        composition="iconOnly"
        aria-label="타이머 초기화"
      >
        <RotateCcw />
      </Button>
      {currentTimerStatus === "RUNNING" ? (
        <Button
          onClick={pause}
          shape="circle"
          intent="ghost"
          composition="iconOnly"
          className="h-12 w-12 [&_svg]:size-5"
          aria-label="타이머 일시정지"
        >
          <Pause />
        </Button>
      ) : (
        <Button
          onClick={start}
          shape="circle"
          intent="ghost"
          composition="iconOnly"
          className="h-12 w-12 [&_svg]:size-5"
          aria-label="타이머 시작"
        >
          <Play />
        </Button>
      )}
      <Button
        onClick={skip}
        shape="circle"
        intent="reveal"
        composition="iconOnly"
        aria-label="타이머 스킵"
      >
        <SkipForward />
      </Button>
    </div>
  );
}
