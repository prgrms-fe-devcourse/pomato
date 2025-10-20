import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import type { CommentWithAuthor } from "@features/feed/model/tables";

type CommentPanelProps = {
  comments: CommentWithAuthor[];
  onSubmit: (text: string) => void;
  className?: string;
};

export default function Comment({ comments, onSubmit, className }: CommentPanelProps) {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<CommentWithAuthor[]>([]);

  useEffect(() => {
    setItems(comments);
  }, [comments]);

  const handleSend = () => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue("");
  };

  return (
    <>
      <div
        role="separator"
        aria-orientation="horizontal"
        className="-mx-[16px] h-[1px] bg-white/15 from-transparent to-transparent dark:bg-white/10"
      />

      {/* 리스트 */}
      <ul className={(twMerge("flex flex-col gap-1"), className)}>
        {items.map((c) => (
          <li key={c.id}>
            <div className="flex gap-3 py-2">
              {/* 아바타 */}
              {c.author.avatar_url ? (
                <Avatar src={c.author.avatar_url} size="s" />
              ) : (
                <Avatar size="s" />
              )}

              {/* Comments 영역 */}
              <div className="min-w-0 flex-1">
                <div className="rounded-lg bg-white/5 p-3 dark:bg-black/10">
                  <div className="mb-1.5 flex items-center justify-start gap-2">
                    <span className="label-text-s-semibold text-wh">{c.author.username}</span>
                    <span className="label-text-xs text-wh/60">
                      {formatTimeShort(new Date(c.createdAt))}
                    </span>
                  </div>
                  <p className="paragraph-text-s text-wh/85 mt-0.5 break-words">{c.content}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 입력창 — 한 줄 배치 */}
      <div className="flex items-center gap-3">
        <Avatar size="s" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="댓글을 입력하세요..."
          containerStyle={twMerge("flex-1 border px-3 py-2")}
          aria-label="댓글 입력"
        />

        <Button
          size={"md"}
          intent="primary"
          composition="iconOnly"
          onClick={handleSend}
          disabled={!value.trim()}
          className={twMerge(
            "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border px-2 py-2",
            !value.trim() && "cursor-not-allowed opacity-50",
          )}
          aria-label="댓글 보내기"
        >
          <Send className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </>
  );
}

// 댓글 영역 (1분 전, 36분 전, 4시간 전 .... etc)
function formatTimeShort(d: Date): string {
  const now = new Date();
  const diffSec = Math.max(0, Math.floor((now.getTime() - d.getTime()) / 1000));

  const MIN = 60;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;

  if (diffSec < MIN) return "방금 전";
  if (diffSec < HOUR) return `${Math.floor(diffSec / MIN)}분 전`;
  if (diffSec < DAY) return `${Math.floor(diffSec / HOUR)}시간 전`;

  const days = Math.floor(diffSec / DAY);
  if (days < 30) return `${days}d`; // 1d, 2d, ...

  const sameYear = d.getFullYear() === now.getFullYear();
  return d.toLocaleDateString(
    "ko-KR",
    sameYear
      ? { month: "numeric", day: "numeric" }
      : { year: "numeric", month: "numeric", day: "numeric" },
  );
}
