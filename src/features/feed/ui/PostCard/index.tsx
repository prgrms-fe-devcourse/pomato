import { SquarePen, Trash, Heart, MessageCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Dropdown from "@components/Dropdown";
import type { CommentWithAuthor } from "@features/feed/types/feed.types";
import CommentPanel from "@features/feed/ui/Comment";

type DropdownItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  isRed?: boolean;
};

export type PostCardProps = {
  id: string;
  author: { username: string; display_name?: string; avatar?: string; id: string };
  content: string;
  image_url?: string;
  createdAt: Date;
  likes: number;
  liked?: boolean;
  comments: CommentWithAuthor[];
  onToggleLike: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
  onDelete?: (id: string) => void;
  currentUserId?: string;
};

export default function PostCard({
  id,
  author,
  content,
  image_url,
  createdAt,
  likes,
  liked = false,
  comments,
  onToggleLike,
  onAddComment,
  onDelete,
  currentUserId,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  // 본인이 작성한 게시글인지 확인
  const isOwnPost = currentUserId && author.id === currentUserId;

  // 메뉴 아이템 생성 (본인 게시글에만 표시)
  const menuItems: DropdownItem[] = isOwnPost
    ? [
        { key: "edit", label: "수정", icon: SquarePen, onSelect: () => console.log("수정") },
        { key: "delete", label: "삭제", icon: Trash, isRed: true, onSelect: () => onDelete?.(id) },
      ]
    : [];

  return (
    <div
      className={twMerge(
        "bg-wh/4 border-wh/6 dark:bg-bl/15 hover:bg-wh/10 hover:border-wh/12 hover:dark:bg-bl/30 hover:dark:border-bl/10 border-1",
        "flex flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px]",
      )}
      role="article"
      aria-label="post"
    >
      {/* 헤더 */}
      <div className="flex min-h-[40px] items-center justify-between">
        <div className="flex items-center gap-[12px]" aria-label="author information">
          {author.avatar ? <Avatar src={author.avatar} /> : <Avatar />}
          <div className="flex flex-col justify-center">
            <span className="label-text-m-semibold text-wh">{author.display_name}</span>
            <span className="label-text-s text-wh/60 mt-1">
              {author.username} · {formatOccurredTime(new Date(createdAt))}
            </span>
          </div>
        </div>
        {isOwnPost && <Dropdown className="top-[-10px]" items={menuItems} />}
      </div>

      {/* 본문 */}
      <div className="paragraph-text-m text-wh flex flex-col gap-[12px]" aria-label="post content">
        <p className="paragraph-text-medium">{content}</p>

        {image_url && (
          <div className="max-w-full overflow-hidden">
            <img
              src={image_url}
              alt=""
              className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain"
              aria-hidden
            />
          </div>
        )}
      </div>

      {/* 액션 */}
      <div className="flex gap-[16px]">
        <button
          type="button"
          onClick={() => onToggleLike(id)}
          aria-pressed={liked}
          aria-label="post like button"
          className={twMerge(
            "text-wh/65 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]",
            "hover:bg-pink-500/10 hover:text-pink-500",
            liked && "text-pink-500",
          )}
        >
          <Heart
            width={15}
            height={15}
            className={twMerge("stroke-current", liked && "fill-current")}
            aria-hidden
          />
          <span className="label-text-xs">{likes > 999 ? "999+" : likes}</span>
        </button>

        <button
          className={twMerge(
            "text-wh/65 hover:bg-wh/10 hover:text-wh/85 hover:dark:bg-bl/30 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]",
            showComments && "bg-wh/10 dark:bg-bl/30",
          )}
          aria-label="post comment button"
          onClick={() => setShowComments((v) => !v)}
        >
          <MessageCircle width={15} height={15} className="stroke-current" />
          <span className="label-text-xs">{comments.length}</span>
        </button>
      </div>

      {/* 댓글 패널 */}
      {showComments && (
        <CommentPanel comments={comments} onSubmit={(text) => onAddComment(id, text)} />
      )}
    </div>
  );
}

// 게시글 영역 (1m, 36m, 4h .... etc)
// 메세지 시간 발생 기준을 표시 (date 타입을 계산하여 표시하는 함수)
function formatOccurredTime(value: Date, now: Date = new Date()): string {
  const diffMs = Math.max(0, now.getTime() - value.getTime());

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)}분 전`; // 0분도 최소 1m

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`; // 1h, 2h, 3h, ... 23h

  const days = Math.floor(hours / 24);
  return `${days}일 전`; // 1d, 2d, ...
}
