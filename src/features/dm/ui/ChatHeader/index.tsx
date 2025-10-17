import { ChevronLeft, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router";

import Avatar from "@components/Avatar";

export default function ChatHeader() {
  const navigate = useNavigate();
  return (
    <div className="border-wh/15 flex h-[64px] items-center justify-between border-b-1 px-[16px]">
      <div className="flex gap-[12px]">
        <button onClick={() => void navigate(-1)} className="cursor-pointer">
          <ChevronLeft width={24} height={24} />
        </button>
        <Avatar size="s" />
        <div className="flex flex-col justify-center">
          <span className="label-text-medium-semibold">Jordan Taylor</span>
          <span className="label-text-xs text-wh/75">오프라인</span>
        </div>
      </div>
      <button>
        <MoreVertical width={24} height={24} />
      </button>
    </div>
  );
}
