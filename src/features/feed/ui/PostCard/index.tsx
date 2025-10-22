import { SquarePen, Trash, Heart, MessageCircle, type LucideIcon, Camera, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
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

type LocalImage = {
  id: string;
  image_url: string;
  file: File;
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
  onEdit?: (id: string, content: string, imageFile?: File) => Promise<void>;
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
  onEdit,
  currentUserId,
}: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

  // Post 이미지 로딩 관련
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 본인이 작성한 게시글인지 확인
  const isOwnPost = currentUserId && author.id === currentUserId;

  // 게시글 수정 관련
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [editImage, setEditImage] = useState<LocalImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 편집 모드 시작
  const handleStartEdit = () => {
    setEditContent(content);
    setEditImage(null);
    setIsEditing(true);
  };

  // 편집 취소
  const handleCancelEdit = () => {
    setEditContent(content);
    setEditImage(null);
    setIsEditing(false);
  };

  // 편집 완료
  const handleSaveEdit = async () => {
    if (!editContent.trim()) return;

    setIsUploading(true);
    try {
      await onEdit?.(id, editContent, editImage?.file);
      setIsEditing(false);
      setEditImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file || !file.type.startsWith("image/")) return;

    if (editImage) {
      URL.revokeObjectURL(editImage.image_url);
    }

    const previewUrl = URL.createObjectURL(file);
    setEditImage({
      id: crypto.randomUUID(),
      image_url: previewUrl,
      file,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 이미지 삭제
  const handleRemoveImage = () => {
    if (editImage) {
      URL.revokeObjectURL(editImage.image_url);
      setEditImage(null);
    }
  };

  // 편집 모드에서 포커스
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // 컴포넌트 언마운트 시 이미지 정리
  useEffect(() => {
    return () => {
      if (editImage) {
        URL.revokeObjectURL(editImage.image_url);
      }
    };
  }, [editImage]);

  // 메뉴 아이템 생성 (본인 게시글에만 표시)
  const menuItems: DropdownItem[] = isOwnPost
    ? [
        { key: "edit", label: "수정", icon: SquarePen, onSelect: handleStartEdit },
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
        {isEditing ? (
          // 편집 모드
          <div className="flex flex-col gap-3">
            <textarea
              ref={textareaRef}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="무슨 생각을 하고 있나요?"
              disabled={isUploading}
              className={twMerge(
                "block w-full rounded-[8px] border px-4 py-3 outline-none",
                "h-[100px] resize-none overflow-y-auto",
                "text-wh/50 placeholder:text-wh/50 paragraph-text-s",
                "bg-wh/20 border-wh/15 dark:bg-bl/30 dark:border-wh/12",
                "focus:bg-wh/25 focus:border-wh/30 dark:focus:bg-bl/40 dark:focus:border-wh/25",
                "pc-scroll",
              )}
            />

            {/* 이미지 편집 영역 */}
            <div className="flex flex-col gap-2">
              {/* 기존 이미지 표시 */}
              {image_url && !editImage && (
                <div className="relative">
                  <img
                    src={image_url}
                    alt="기존 이미지"
                    className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain select-none"
                  />
                </div>
              )}

              {/* 새 이미지 미리보기 */}
              {editImage && (
                <div className="relative">
                  <img
                    src={editImage.image_url}
                    alt="편집할 이미지"
                    className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain"
                  />
                  {/* 이미지 변경 취소를 원할 경우 삭제 버튼 */}
                  <Button
                    onClick={handleRemoveImage}
                    intent="reveal"
                    className={twMerge(
                      "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border select-none",
                      "border-white/15 bg-white/15 hover:bg-white/25 active:bg-white/35",
                      "dark:border-white/12 dark:bg-black/30 dark:hover:bg-black/40 dark:active:bg-black/50",
                    )}
                    aria-label="이미지 변경 취소"
                    composition={"iconOnly"}
                  >
                    <X className="h-4 w-4 text-white" />
                  </Button>
                </div>
              )}

              {/* 이미지 업로드 및 편집 액션 버튼 */}
              <div className="mt-2 flex items-center justify-between gap-3">
                {/* 이미지 업로드 버튼 (왼쪽) */}
                <div>
                  {!editImage && (
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      intent="reveal"
                      size="md"
                      aria-label="이미지 업로드"
                      className={twMerge(
                        "min-w-[93px] gap-[10px] px-[15px] py-[4px] select-none",
                        "bg-wh/15 dark:bg-bl/25 opacity-100",
                      )}
                    >
                      <Camera className="h-4 w-4" aria-hidden />
                      <span className="label-text-s">Image</span>
                    </Button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* 편집 액션 버튼 (우측) */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancelEdit}
                    intent="reveal"
                    size="md"
                    disabled={isUploading}
                    className={twMerge(
                      "gap-[6px] rounded-[8px] px-4 select-none",
                      "bg-wh/15 dark:bg-bl/25 opacity-100",
                    )}
                  >
                    <span className="label-text-s">취소</span>
                  </Button>

                  <Button
                    onClick={() => {
                      void handleSaveEdit();
                    }}
                    intent="primary"
                    size="md"
                    type="submit"
                    disabled={!editContent.trim() || isUploading}
                    className={twMerge(
                      "gap-[6px] rounded-[8px] px-4 select-none",
                      "border-[#3B82F6] bg-[#2563EB]",
                      "dark:border-[#2563EB] dark:bg-[#2563EB]",
                      isUploading && [
                        "border-[#3B82F6] bg-[#3B82F6] opacity-50",
                        "opacity-50 dark:border-[#3B82F6] dark:bg-[#3B82F6]",
                        "cursor-not-allowed",
                      ],
                    )}
                  >
                    <span className="label-text-s">{isUploading ? "저장 중..." : "저장"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 일반 표시 모드 (수정 아닐 때)
          <>
            <p className="paragraph-text-medium">{content}</p>
            {image_url && !imageError && (
              <div className="max-w-full overflow-hidden">
                <img
                  src={image_url}
                  className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  style={{ display: imageLoaded ? "block" : "none" }}
                  aria-hidden
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* 액션 (Liked, Comments) */}
      {/* 편집 중일 때는 비활성화 처리 */}
      {!isEditing && (
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
      )}

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
