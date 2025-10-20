import type { PostWithComments } from "@features/feed/model/tables";
import WritePost from "@features/feed/ui/WritePost";

export default function FeedHeader({
  onCreatePost,
}: {
  onCreatePost: (p: PostWithComments) => void;
}) {
  return (
    <>
      <WritePost onCreatePost={onCreatePost} />

      {/* 구분선 */}
      <div
        role="separator"
        aria-orientation="horizontal"
        className="-mx-[16px] h-[1px] bg-white/15 from-transparent to-transparent dark:bg-white/10"
      />
    </>
  );
}
