import { SquarePen, Trash, type LucideIcon } from "lucide-react";
import { Heart, MessageCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Dropdown from "@components/Dropdown";

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
        <button
          className="text-wh/65 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px] hover:bg-pink-500/10 hover:text-pink-500"
          aria-label="post like button"
        >
          <Heart width={15} height={15} />
          <span className="label-text-xs">999+</span>
        </button>
        <button
          className="text-wh/65 hover:bg-wh/10 hover:text-wh/85 hover:dark:bg-bl/30 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]"
          aria-label="post comment button"
        >
          <MessageCircle width={15} height={15} />
          <span className="label-text-xs">999</span>
        </button>
      </div>
    </div>
  );
}
