import { Play, RotateCcw, SkipForward, Users } from "lucide-react";

import Button from "@components/Button";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";

import { dot } from "./variants";

const SESSION_STATUS_TEXT = ["FOCUS", "BREAK", "LONG BREAK"];

export default function Timer() {
  const { activeUsers } = useActiveUsersStore();
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto group-has-[section[aria-label='Panel']]:max-[800px]:hidden">
      <div className="flex flex-col items-center justify-center gap-8">
        <img src="https://placehold.co/180x180" className="border-wh/20 rounded-xl border-2" />
        <div className="flex flex-col items-center gap-3">
          <header>
            <h2 className="text-wh/70 text-sm tracking-widest">{SESSION_STATUS_TEXT[0]}</h2>
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
      <div>
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="cursor-default">00:00</span>
          <div className="bg-wh/15 dark:bg-bl/10 relative h-1 w-50 flex-1 rounded-full">
            <div
              className="bg-wh dark:bg-bl/45 absolute h-1 rounded-full"
              style={{ width: "42%" }}
            ></div>
          </div>
          <span className="cursor-default">25:00</span>
        </div>
      </div>
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
          type="button"
          shape="circle"
          intent="ghost"
          composition="iconOnly"
          className="h-12 w-12 [&_svg]:size-5"
          aria-label="타이머 시작"
        >
          <Play />
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
      <p>
        <Button
          type="button"
          intent="ghost"
          size="md"
          shape="circle"
          composition="iconText"
          className="px-4"
        >
          <Users /> {activeUsers.length} 명이 함께 집중 중
        </Button>
      </p>
    </section>
  );
}
