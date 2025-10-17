import { Pen } from "lucide-react";
import { useState } from "react";

import Button from "@components/Button";
import PostComposer from "@features/PostComposer";

export default function WritePost() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 토글된 경우에만 표시 */}
      {open ? (
        <PostComposer
          onPost={(content, image) => {
            // TODO: supabase 업로드 등 실제 작성 처리
            console.log("게시물 작성:", { content, image });
            setOpen(false); // 작성 후 닫기
          }}
          onImageUpload={(files) => {
            console.log("이미지 업로드:", files);
          }}
          placeholder="무슨 생각을 하고 있나요?"
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
      )}
    </>
  );
}
