import { Search } from "lucide-react";

import Input from "@components/Input";
import PostList from "@features/feed/ui/PostList";

export default function Feed() {
  return (
    <div className="flex flex-col gap-[12px] p-[16px]">
      <Input Icon={{ Component: Search, align: "right" }} placeholder="검색어를 입력하세요..." />
      <PostList />
    </div>
  );
}
