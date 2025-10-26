import WritePost from "@features/feed/ui/WritePost";

export default function FeedHeader({
  onCreatePost,
  isUploading = false,
}: {
  onCreatePost: (content: string, imageFile?: File) => void;
  isUploading?: boolean;
}) {
  return (
    <>
      <WritePost onCreatePost={onCreatePost} isUploading={isUploading} />

      {/* 구분선 */}
      <div
        role="separator"
        aria-orientation="horizontal"
        className="-mx-[16px] h-[1px] bg-white/15 from-transparent to-transparent dark:bg-white/10"
      />
    </>
  );
}
