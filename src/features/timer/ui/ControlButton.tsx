import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

import Button from "@components/Button";

type ControlButtonProps = {
  isRunning: boolean;
  onToggle: () => void;
};

export default function ControlButton({ isRunning, onToggle }: ControlButtonProps) {
  return (
    <div className="flex items-center gap-3" aria-label="타이머 컨트롤 버튼">
      <Button
        type="button"
        shape="circle"
        intent="reveal"
        composition="iconOnly"
        aria-label="타이머 초기화"
      >
        <RotateCcw />
      </Button>
      <Button
        onClick={onToggle}
        type="button"
        shape="circle"
        intent="ghost"
        composition="iconOnly"
        className="h-12 w-12 [&_svg]:size-5"
        aria-label={isRunning ? "타이머 일시정지" : "타이머 시작"}
      >
        {isRunning ? <Pause /> : <Play />}
      </Button>
      <Button
        type="button"
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
