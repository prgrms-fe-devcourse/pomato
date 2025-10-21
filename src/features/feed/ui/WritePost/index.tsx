import { Pen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import Button from "@components/Button";
import PostComposer from "@features/feed/ui/PostComposer";

export default function WritePost({
  onCreatePost,
  isUploading = false,
}: {
  onCreatePost: (content: string, imageFile?: File) => void;
  isUploading?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const prevUploadingRef = useRef(false);

  useEffect(() => {
    const wasUploading = prevUploadingRef.current;
    if (wasUploading && !isUploading) {
      setOpen(false);
      setResetKey((prev) => prev + 1);
    }
    prevUploadingRef.current = isUploading;
  }, [isUploading]);

  return open || isUploading ? (
    <PostComposer
      key={resetKey}
      onPost={(content, image) => {
        onCreatePost(content, image?.file);
      }}
      onImageUpload={() => {}}
      placeholder="무슨 생각을 하고 있나요?"
      isUploading={isUploading}
    />
  ) : (
    // 글쓰기 버튼 (토글)
    <Button
      intent="primary"
      size="md"
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      className="h-[40px] w-full justify-center gap-2 rounded-[10px]"
    >
      <Pen className="h-4 w-4" aria-hidden />
      <span className="label-text-m">{open ? "닫기" : "글쓰기"}</span>
    </Button>
  );
}
