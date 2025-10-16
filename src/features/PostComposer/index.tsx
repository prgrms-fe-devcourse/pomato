import { Camera } from "lucide-react";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

import "@features/PostComposer/PostComposer.module.css";
import Button from "@components/Button";

/**
 * 게시물 작성 컴포넌트입니다.
 * 텍스트 입력, 이미지 업로드, 게시물 작성 기능을 제공하며,
 * 다양한 상태(초기, 포커스, 활성, 채워짐, 스크롤, 비활성화)를 지원합니다.
 * 라이트/다크 모드와 접근성을 완벽히 지원합니다.
 *
 * @component
 *
 * @example
 * ```tsx
 * import PostComposer from "@features/PostComposer";
 *
 * // 기본 사용법
 * <PostComposer
 *   onPost={(content, images) => {
 *     console.log("게시물 작성:", content);
 *     console.log("이미지 데이터:", images); // base64 형식의 이미지 배열
 *     images.forEach(img => {
 *       console.log("이미지 ID:", img.id);
 *       console.log("Base64 데이터:", img.base64);
 *       console.log("가공된 파일:", img.file);
 *       console.log("파일명:", img.file.name);
 *       console.log("파일 크기:", img.file.size);
 *       console.log("파일 타입:", img.file.type);
 *       console.log("수정 시간 (숫자):", img.file.lastModified);
 *       console.log("수정 시간 (문자열):", img.file.lastModifiedDate);
 *     });
 *   }}
 *   onImageUpload={(files) => {
 *     console.log("이미지 업로드:", files);
 *   }}
 * />
 *
 * // 비활성화 상태
 * <PostComposer
 *   disabled
 *   placeholder="로그인하여 게시물을 작성하세요"
 *   onPost={() => {}}
 * />
 * ```
 *
 * @param {object} props - PostComposer 컴포넌트의 속성
 * @param {(content: string, images: ImagePreview[]) => void} [props.onPost] - 게시물 작성 시 실행될 함수 (base64 형식의 이미지 데이터 포함)
 * @param {(files: FileList) => void} [props.onImageUpload] - 이미지 업로드 시 실행될 함수
 * @param {boolean} [props.disabled=false] - 컴포넌트 비활성화 여부
 * @param {string} [props.placeholder="What's happening?"] - 텍스트 영역 플레이스홀더
 * @param {string} [props.className] - 루트 컨테이너에 추가할 Tailwind 클래스명
 * @returns {JSX.Element} 게시물 작성 컴포넌트
 */

// 이미지 미리보기 타입
export type ImagePreview = {
  id: string;
  base64: string;
  file: File;
};

// 파일을 base64로 변환하는 함수
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.addEventListener("error", () => reject(new Error("파일 읽기 실패")));
  });
}

// 게시물 작성 컴포넌트 Props 타입
type PostComposerProps = {
  onPost: (content: string, images?: ImagePreview[]) => void;
  onImageUpload: (files: FileList) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export default function PostComposer({
  onPost,
  onImageUpload,
  disabled = false,
  placeholder = "Sign in to post",
  className,
}: PostComposerProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [images, setImages] = useState<ImagePreview[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasContent = content.length > 0;
  const canPost = hasContent && !disabled;

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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || disabled) return;

    const fileArray = [...files];

    try {
      // 각 파일을 base64로 변환
      const imagePreviews = await Promise.all(
        fileArray.map(async (file) => {
          const base64 = await fileToBase64(file);
          return {
            id: Math.random().toString(36).slice(2, 11),
            base64,
            file,
          };
        }),
      );

      setImages((prev) => [...prev, ...imagePreviews]);
      onImageUpload?.(files);

      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("이미지 변환 중 오류 발생:", error);
    }
  }

  // 게시물 작성 및 데이터 관리
  function handlePost() {
    if (disabled || !content.trim()) return;

    if (images.length > 0) {
      onPost(content, images);
    } else {
      onPost(content);
    }

    handleClearData();
  }

  function handleClearData() {
    setContent("");
    setImages([]);
  }

  return (
    <div
      className={twMerge(
        "mx-auto w-full max-w-[600px] p-4 transition-colors",
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={twMerge(
            "block w-full rounded-[8px] border px-4 py-3 outline-none",
            "max-h-[220px] min-h-[100px] resize-none overflow-y-auto",
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
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="group border-wh/20 dark:border-wh/15 relative aspect-square overflow-hidden rounded-lg border"
            >
              <img
                src={image.base64}
                alt={`미리보기 ${image.id}`}
                className="h-full w-full object-cover transition-transform"
              />
            </div>
          ))}
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
              "min-w-[93px] gap-[10px] px-[15px] py-[4px]",
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
            multiple
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
          <span className="label-text-s">Post</span>
        </Button>
      </div>
    </div>
  );
}
