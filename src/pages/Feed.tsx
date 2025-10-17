import { Search } from "lucide-react";

import Input from "@components/Input";
import FeedHeader from "@features/feed/ui/FeedHeader";
import PostList from "@features/feed/ui/PostList";

export default function Feed() {
  return (
    <div className="flex flex-col gap-[12px] p-[16px] select-none">
      {/* 글쓰기 영역 + 구분선*/}
      <FeedHeader />

      {/* 검색창 영역 */}
      <Input Icon={{ Component: Search, align: "right" }} placeholder="검색어를 입력하세요..." />

      {/* Post List 영역 */}
      <PostList />
    </div>
  );
}
