import { Heart, MessageCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Dropdown from "@components/Dropdown";

export default function Post() {
  return (
    <div
      className={twMerge(
        "bg-wh/4 border-wh/6 dark:bg-bl/15 hover:bg-wh/10 hover:border-wh/12 hover:dark:bg-bl/30 hover:dark:border-bl/10 border-1",
        "flex flex-col gap-[16px] rounded-[12px] px-[24px] py-[20px]",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-[12px]">
          <Avatar />

          <div className="flex flex-col justify-start">
            <span className="label-text-m-semibold text-wh">name</span>
            <span className="label-text-s text-wh/60">id and times</span>
          </div>
        </div>
        <Dropdown />
      </div>
      <div className="paragraph-text-m text-wh flex flex-col gap-[12px]">
        <p className="paragraph-text-medium">
          Just finished working on this amazing glassmorphism UI kit! 🎨✨
        </p>
        <div className="max-w-full overflow-hidden">
          <img
            src=""
            alt="example"
            className="border-wh/10 h-auto w-full rounded-[12px] border-1 object-contain"
          />
        </div>
      </div>
      <div className="flex gap-[16px]">
        <button className="text-wh/65 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px] hover:bg-pink-500/10 hover:text-pink-500">
          <Heart width={15} height={15} />
          <span className="label-text-xs">999+</span>
        </button>
        <button className="text-wh/65 hover:bg-wh/10 hover:text-wh/85 hover:dark:bg-bl/30 flex h-[34px] cursor-pointer items-center justify-center gap-[8px] rounded-[20px] px-[12px]">
          <MessageCircle width={15} height={15} />
          <span className="label-text-xs">999</span>
        </button>
      </div>
    </div>
  );
}
