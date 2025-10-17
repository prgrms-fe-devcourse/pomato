import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";

export type Comment = {
  id: string;
  author: { name: string; avatar?: string };
  text: string;
  createdAt: Date;
};

type CommentPanelProps = {
  comments: Comment[];
  onSubmit: (text: string) => void;
  className?: string;
};

export default function Comment({ comments, onSubmit, className }: CommentPanelProps) {
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Comment[]>([]);

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
              {c.author.avatar ? <Avatar src={c.author.avatar} size="s" /> : <Avatar size="s" />}

              {/* Comments 영역 */}
              <div className="min-w-0 flex-1">
                <div className="rounded-lg bg-white/5 p-3 dark:bg-black/10">
                  <div className="mb-1.5 flex items-center justify-start gap-2">
                    <span className="label-text-s-semibold text-wh">{c.author.name}</span>
                    <span className="label-text-xs text-wh/60">{formatTimeShort(c.createdAt)}</span>
                  </div>
                  <p className="paragraph-text-s text-wh/85 mt-0.5 break-words">{c.text}</p>
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

function formatTimeShort(d: Date) {
  const now = new Date();
  const diff = Math.max(0, (now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86_400) return `${Math.floor(diff / 3600)}시간 전`;
  return d.toLocaleDateString();
}
