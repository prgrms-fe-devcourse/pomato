import { SquarePen, Trash, Heart, MessageCircle, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Dropdown from "@components/Dropdown";
import CommentPanel, { type Comment } from "@features/feed/ui/Comment";

/**
 * Post 컴포넌트
 *
 * 하나의 게시글 카드(UI)를 렌더링합니다.
 * 아바타, 작성자 정보, 본문 텍스트, 이미지, 좋아요/댓글 버튼을 포함합니다.
 *
 * - Avatar 컴포넌트와 Dropdown 메뉴 포함
 *
 * @component
 * @example
 * ```tsx
 * <Post />
 * ```
 *
 * @returns {JSX.Element} 렌더링된 게시글 카드 컴포넌트
 */

type DropdownItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  isRed?: boolean;
};

const items: DropdownItem[] = [
  { key: "edit", label: "수정", icon: SquarePen, onSelect: () => console.log("수정") },
  { key: "delete", label: "삭제", icon: Trash, isRed: true, onSelect: () => console.log("삭제") },
];

export default function PostList() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(999);

  const toggleLike = () => {
    setLiked((v) => {
      // 카운트도 함께 조절하고 싶으면 아래 적용
      setLikeCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  };

  // 코멘트 영역
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: { name: "홍길동", avatar: "https://picsum.photos/seed/a/60" },
      text: "대단해요! 꾸준함이 제일 어려운데 👏",
      createdAt: new Date(Date.now() - 60 * 1000),
    },
    {
      id: "2",
      author: { name: "김철수", avatar: "https://picsum.photos/seed/b/60" },
      text: "저도 오늘 3세션 했어요! 함께 화이팅!",
      createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
    },
  ]);

  const addComment = (text: string) => {
    setComments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        author: { name: "You" },
        text,
        createdAt: new Date(),
      },
    ]);
  };

  return (
    <div
      className={twMerge(
        "bg-wh/4 border-wh/6 dark:bg-bl/15 hover:bg-wh/10 hover:border-wh/12 hover:dark:bg-bl/30 hover:dark:border-bl/10 border-1",
        "flex flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px]",
      )}
      role="article"
      aria-label="post"
    >
      {/* 헤더 라인 */}
      <div className="flex min-h-[40px] items-center justify-between">
        <div className="flex items-center gap-[12px]" aria-label="author information">
          <Avatar />
          <div className="flex flex-col justify-center">
            <span className="label-text-m-semibold text-wh" aria-label="author name">
              name
            </span>
            <span className="label-text-s text-wh/60" aria-label="author id timestamp">
              id and times
            </span>
          </div>
        </div>
        <Dropdown className={"top-[-10px]"} items={items} />
      </div>
      <div className="paragraph-text-m text-wh flex flex-col gap-[12px]" aria-label="post content">
        <p className="paragraph-text-medium" aria-label="post text">
          Just finished working on this amazing glassmorphism UI kit! 🎨✨
        </p>
        <div className="max-w-full overflow-hidden" aria-label="post image container">
          <img
            src="https://img.freepik.com/free-vector/flat-post-its-boards-infographics_23-2148649295.jpg"
            // src=""
            alt="example"
            className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain"
            aria-label="post image"
          />
        </div>
      </div>
      <div className="flex gap-[16px]" aria-label="post buttons">
        {/* <button
          className="text-wh/65 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px] hover:bg-pink-500/10 hover:text-pink-500"
          aria-label="post like button"
        >
          <Heart width={15} height={15} />
          <span className="label-text-xs">999+</span>
        </button> */}

        {/* 좋아요 토글 */}
        <button
          type="button"
          onClick={toggleLike}
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
            className={twMerge(
              "stroke-current",
              liked && "fill-current", // on일 때 내부 채움
            )}
            aria-hidden="true"
          />
          <span className="label-text-xs">{likeCount > 999 ? "999+" : likeCount}</span>
        </button>

        <button
          // className="text-wh/65 hover:bg-wh/10 hover:text-wh/85 hover:dark:bg-bl/30 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]"
          className={twMerge(
            "text-wh/65 hover:bg-wh/10 hover:text-wh/85 hover:dark:bg-bl/30 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]",
            showComments && "bg-wh/10 dark:bg-bl/30",
          )}
          aria-label="post comment button"
          onClick={() => setShowComments((v) => !v)}
        >
          <MessageCircle width={15} height={15} className={twMerge("stroke-current")} />
          <span className="label-text-xs">999</span>
        </button>
      </div>
      {/* 토글로 열기 */}
      {showComments && <CommentPanel comments={comments} onSubmit={addComment} />}
    </div>
  );
}
