import { Send, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";

export type Comment = {
  id: string;
  author: { name: string; avatar?: string };
  text: string;
  createdAt: Date;
  likes?: number;
};

type CommentPanelProps = {
  comments: Comment[];
  onSubmit: (text: string) => void;
  className?: string;
};

export default function Comment({ comments, onSubmit, className }: CommentPanelProps) {
  const [value, setValue] = useState("");

  const [items, setItems] = useState<Array<Comment & { likes: number; liked: boolean }>>([]);

  useEffect(() => {
    setItems(
      comments.map((c) => ({
        ...c,
        likes: c.likes ?? 0, // Likes 값이 없으면 0
        liked: false, // UI 토글 상태
      })),
    );
  }, [comments]);

  // 좋아요 토글
  const toggleLike = (id: string) => {
    setItems((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        const nextLiked = !c.liked;
        const nextLikes = Math.max(0, c.likes + (nextLiked ? 1 : -1));

        return { ...c, liked: nextLiked, likes: nextLikes };
      }),
    );
  };

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
        className={
          (twMerge(
            "-mx-[16px] h-[1px] bg-white/15 from-transparent to-transparent dark:bg-white/10",
          ),
          className)
        }
      />

      {/* 리스트 */}
      <ul className="flex flex-col gap-2">
        {items.map((c) => (
          <li key={c.id}>
            <div className="flex gap-3">
              {/* 아바타 */}
              <div className="shrink-0">
                {c.author.avatar ? <Avatar src={c.author.avatar} size="s" /> : <Avatar size="s" />}
              </div>

              {/* Comments 영역 */}
              <div className="min-w-0 flex-1">
                <div className="rounded-lg bg-white/5 p-3 dark:bg-black/10">
                  <div className="flex items-center justify-between">
                    <span className="label-text-s-semibold text-wh">{c.author.name}</span>
                    <span className="label-text-xs text-wh/60">{formatTimeShort(c.createdAt)}</span>
                  </div>
                  <p className="paragraph-text-s text-wh/85 mt-0.5 break-words">{c.text}</p>
                </div>

                {/* 좋아요 버튼*/}
                <button
                  type="button"
                  onClick={() => toggleLike(c.id)}
                  aria-pressed={c.liked}
                  className={twMerge(
                    "mt-1 inline-flex items-center gap-1 rounded-[8px] px-2 py-0.5",
                    c.liked ? "text-pink-500" : "hover:bg-wh/10 dark:hover:bg-bl/30 text-white/60",
                  )}
                >
                  <Heart
                    className={twMerge(
                      "h-3.5 w-3.5 stroke-current",
                      c.liked && "fill-current", // ON이면 속 채우기
                    )}
                    aria-hidden
                  />
                  <span className="label-text-xs">{c.likes}</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 입력창 — 한 줄 배치 */}
      <div className="mt-3 flex items-center gap-2">
        <Avatar size="s" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="댓글을 입력하세요..."
          className={twMerge(
            "flex-1 rounded-[10px] border px-3 py-2 outline-none",
            "border-white/20 bg-white/10 text-white placeholder:text-white/50",
            "dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30",
          )}
          aria-label="댓글 입력"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim()}
          className={twMerge(
            "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border px-2 py-2",
            "border-wh/12 bg-wh/15 text-white/85",
            "hover:bg-wh/25 active:bg-wh/30",
            "dark:border-wh/10 dark:bg-bl/40 dark:hover:bg-bl/50",
            !value.trim() && "cursor-not-allowed opacity-50",
          )}
          aria-label="댓글 보내기"
        >
          <Send className="h-4 w-4" aria-hidden />
        </button>
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
