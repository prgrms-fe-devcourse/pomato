import { Camera, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@components/Button";

/**
 * @component
 *
 * @example
 * ```tsx
 *
 * function MyComponent() {
 *   const handlePost = (content: string, image?: LocalImage) => {
 *     console.log("게시물 작성:", { content, image });
 *     // 게시물 저장 로직
 *   };
 *
 *   const handleImageUpload = (files: FileList) => {
 *     console.log("이미지 업로드:", files);
 *     // 이미지 업로드 로직
 *   };
 *
 *   return (
 *     <PostComposer
 *       onPost={handlePost}
 *       onImageUpload={handleImageUpload}
 *       placeholder="무슨 일이 일어나고 있나요?"
 *     />
 *   );
 * }
 * ```
 *
 * @param {Object} props - PostComposer 컴포넌트의 속성
 * @param {(content: string, image?: LocalImage) => void} props.onPost - 게시물 작성 시 호출되는 콜백 함수
 * @param {(files: FileList) => void} props.onImageUpload - 이미지 업로드 시 호출되는 콜백 함수
 * @param {boolean} [props.disabled=false] - 컴포넌트 비활성화 여부
 * @param {string} [props.placeholder="Sign in to post"] - 텍스트 영역 플레이스홀더
 * @param {string} [props.className] - 루트 컨테이너에 추가할 Tailwind 클래스명
 *
 * @returns {JSX.Element} 게시물 작성 컴포넌트
 */

type LocalImage = {
  id: string;
  image_url: string; // URL.createObjectURL(file)
  file: File;
};

function revokePreview(url?: string) {
  if (url) URL.revokeObjectURL(url);
}
// 게시물 작성 컴포넌트 Props 타입
type PostComposerProps = {
  onPost: (content: string, image?: LocalImage) => void;
  onImageUpload: (files: FileList) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  isUploading?: boolean;
};

export default function PostComposer({
  onPost,
  onImageUpload,
  disabled = false,
  placeholder = "Sign in to post",
  className,
  isUploading = false,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [image, setImage] = useState<LocalImage | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContent = content.length > 0;
  const canPost = hasContent && !disabled && !isUploading;

  // 텍스트 영역 이벤트 핸들러
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (disabled) return;
    setContent(e.target.value);
  }

  function handleFocus() {
    if (disabled) return;
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  // 이미지 업로드 관련 핸들러
  function handleImageClick() {
    if (disabled) return;
    fileInputRef.current?.click();
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || disabled) return;

    const file = files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    revokePreview(image?.image_url);
    const previewUrl = URL.createObjectURL(file);

    setImage({
      id: crypto.randomUUID(), // 아마 게시글 포스트 ID 값이 들어갈 예정
      image_url: previewUrl,
      file,
    });

    onImageUpload?.(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handlePost() {
    if (disabled || !content.trim()) return;

    onPost(content, image || undefined);
    setContent("");
    if (image) {
      revokePreview(image.image_url);
      setImage(null);
    }
  }

  useEffect(() => {
    return () => revokePreview(image?.image_url);
  }, [image?.image_url]);

  return (
    <div
      className={twMerge(
        "mx-auto w-full transition-colors",
        disabled && "pointer-events-none opacity-50 select-none",
        className,
      )}
    >
      {/* 텍스트 영역 */}
      <div className="relative select-none">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onFocus={handleFocus} // 포커스 확인 여부 영역
          onBlur={handleBlur} // 포커스 해제 영역
          placeholder={placeholder}
          disabled={disabled}
          className={twMerge(
            "block w-full rounded-[8px] border px-4 py-3 outline-none",
            "h-[100px] resize-none overflow-y-auto",
            "text-wh/50 placeholder:text-wh/50 paragraph-text-s",

            // 기본 상태
            "bg-wh/20 border-wh/15",
            "dark:bg-bl/30 dark:border-wh/12",

            // 포커스 상태
            isFocused && !disabled && ["bg-wh/25 border-wh/30", "dark:bg-bl/40 dark:border-wh/25"],

            // 입력 중 상태
            hasContent &&
              !disabled && ["bg-wh/30 border-wh/35", "dark:bg-bl/50", "dark:border-wh/30"],

            // 비활성화 상태
            disabled && [
              "bg-wh/10 border-wh/10",
              "dark:bg-bl/20 dark:border-wh/8",
              "text-wh/50 placeholder:text-wh/50",
              "dark:text-wh/50 dark:placeholder:text-wh/50",
            ],

            "pc-scroll", // ← 전역 클래스 (스크롤바 스타일)
          )}
        />
      </div>

      {/* 이미지 미리보기 영역 */}
      {image && (
        <div className="mt-4 select-none">
          <div className="border-wh/20 dark:border-wh/15 relative mx-auto flex max-h-[300px] w-full items-center justify-center overflow-hidden rounded-[8px] border">
            <img
              src={image.image_url}
              alt="미리보기"
              className="h-full w-full object-fill select-none"
              draggable={false}
            />
            {/* 삭제 버튼 (우측 상단) */}
            <Button
              onClick={() => {
                URL.revokeObjectURL(image.image_url);
                setImage(null);
              }}
              className={twMerge(
                "absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-[8px] border select-none",
                "border-white/15 bg-white/15 hover:bg-white/25 active:bg-white/35",
                "dark:border-white/12 dark:bg-black/30 dark:hover:bg-black/40 dark:active:bg-black/50",
              )}
              intent={"reveal"}
              aria-label="이미지 삭제"
              composition={"iconOnly"}
            >
              <X className="h-4 w-4 text-white" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      {/* 하단 액션 버튼 영역 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* 이미지 업로드 버튼 */}
          <Button
            onClick={() => handleImageClick?.()}
            intent="reveal"
            size="md"
            disabled={disabled}
            aria-label="이미지 업로드"
            className={twMerge(
              "min-w-[93px] gap-[10px] px-[15px] py-[4px] select-none",
              "bg-wh/15 dark:bg-bl/25 opacity-100",
              disabled && ["cursor-not-allowed bg-transparent opacity-30 dark:bg-transparent"],
            )}
          >
            <Camera className="h-4 w-4" aria-hidden />
            <span className="label-text-s">Image</span>
          </Button>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            // multiple
            multiple={false} // 1장만 하기로 했기에 수정
            onChange={(e) => {
              void handleImageUpload(e);
            }}
            className="hidden"
            aria-label="이미지 파일 선택"
          />
        </div>

        {/* 게시물 작성 버튼 */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handlePost?.();
          }}
          intent="primary"
          size="md"
          type="submit"
          disabled={!canPost}
          aria-label="게시물 업로드"
          className={twMerge(
            "gap-[6px] rounded-[8px] px-4 select-none",
            // 활성화 상태 (기존 Button 컴포넌트 Primary 값과 색상이 불일치하여 추가작업 진행)
            canPost && ["border-[#3B82F6] bg-[#2563EB]", "dark:border-[#2563EB] dark:bg-[#2563EB]"],
            // 비활성화 상태 (기존 Button 컴포넌트 Primary 값과 색상이 불일치하여 추가작업 진행)
            !canPost && [
              "border-[#3B82F6] bg-[#3B82F6] opacity-50",
              "opacity-50 dark:border-[#3B82F6] dark:bg-[#3B82F6]",
              "cursor-not-allowed",
            ],
          )}
        >
          <span className="label-text-s">{isUploading ? "업로드 중..." : "Post"}</span>
        </Button>
      </div>
    </div>
  );
}
