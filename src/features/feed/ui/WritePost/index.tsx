import { Pen } from "lucide-react";
import { useState } from "react";

import Button from "@components/Button";
import type { Post } from "@features/feed/model/PostProps";
import PostComposer from "@features/feed/ui/PostComposer";

export default function WritePost({ onCreatePost }: { onCreatePost: (p: Post) => void }) {
  const [open, setOpen] = useState(false);
  return open ? (
    <PostComposer
      onPost={(content, image) => {
        const newPost: Post = {
          id: crypto.randomUUID(),
          author: { name: "나", avatar: "https://picsum.photos/seed/me/60" },
          text: content,
          imageUrl: image?.image_url,
          likes: 0,
          liked: false,
          comments: [],
        };
        onCreatePost(newPost);
        setOpen(false);
      }}
      onImageUpload={() => {}}
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
  );
}
