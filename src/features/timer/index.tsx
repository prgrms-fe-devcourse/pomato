import { cva } from "class-variance-authority";
import { Play, RotateCcw, SkipForward, Users } from "lucide-react";

import Button from "@components/Button";
import { useActiveUsersStore } from "@features/user/store/useActiveUserStore";

const SESSION_STATUS_TEXT = ["FOCUS", "BREAK", "LONG BREAK"];

const dot = cva(
  "focus-visible:ring-wh/12 h-2.5 w-2.5 rounded-full border outline-none focus-visible:ring-2",
  {
    variants: {
      status: {
        default: ["bg-wh/10 border-wh/20", "dark:bg-bl/20 dark:border-wh/8"],
        active: ["bg-wh/30 border-wh/30", "dark:bg-bl/40 dark:border-wh/18 w-7.5"],
        completed: ["bg-wh/50 border-wh/40", "dark:bg-bl/60 dark:border-wh/25"],
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export default function Timer() {
  const { activeUsers } = useActiveUsersStore();
  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 overflow-auto group-has-[section[aria-label='Panel']]:max-[800px]:hidden">
      <header>
        <h2 className="text-wh/70 font-semibold tracking-widest">{SESSION_STATUS_TEXT[0]}</h2>
      </header>
      <ol className="flex items-center gap-2.5" aria-label="세션 진행 단계">
        <li>
          <div className={dot({ status: "default" })} />
        </li>
        <li>
          <div className={dot({ status: "active" })} />
        </li>
        <li>
          <div className={dot({ status: "completed" })} />
        </li>
        <li>
          <div className={dot({ status: "completed" })} />
        </li>
      </ol>
      <div>
        <h3 className="sr-only">타이머</h3>
        <time
          role="timer"
          aria-live="off"
          dateTime="PT25M0S"
          className="text-wh text-7xl font-light"
        >
          25:00
        </time>
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
