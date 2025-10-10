import { cva, type VariantProps } from "class-variance-authority";
import { Camera } from "lucide-react";
import { twMerge } from "tailwind-merge";

import type { AvatarProps } from "@components/Avatar/type";

const DEFAULT_SIZE = "xl";

const avatarVariants = cva(
  "border-2 border-wh/15 bg-wh relative [&_span]:absolute [&_span]:border-wh [&_span]:rounded-full",
  {
    variants: {
      size: {
        xxs: "w-[24px] h-[24px] rounded-[12px] [&_span]:w-[8px] [&_span]:h-[8px] [&_span]:border-1",
        xs: "w-[32px] h-[32px] rounded-[16px] [&_span]:w-[12px] [&_span]:h-[12px] [&_span]:border-2",
        s: "w-[40px] h-[40px] rounded-[20px] [&_span]:w-[14px] [&_span]:h-[14px] [&_span]:border-2",
        m: "w-[52px] h-[52px] rounded-[26px] [&_span]:w-[16px] [&_span]:h-[16px] [&_span]:border-2",
        l: "w-[80px] h-[80px] rounded-[40px] [&_span]:w-[20px] [&_span]:h-[20px] [&_span]:border-2",
        xl: "w-[120px] h-[120px] rounded-[60px] [&_span]:w-[24px] [&_span]:h-[24px] [&_span]:border-3",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

const editVariants = cva(
  "absolute rounded-full border-wh bg-wh/90 dark:bg-bl/90 text-bl dark:text-wh flex items-center justify-center",
  {
    variants: {
      size: {
        xxs: "!w-[12px] !h-[12px] bottom-[0px] right-[0px] border-1 [&>svg]:w-[2px] [&>svg]:h-[2px]",
        xs: "!w-[16px] !h-[16px] bottom-[1px] right-[1px] border-2 [&>svg]:w-[6px] [&>svg]:h-[6px]",
        s: "!w-[20px] !h-[20px] bottom-[2px] right-[2px] border-2 [&>svg]:w-[10px] [&>svg]:h-[10px]",
        m: "!w-[24px] !h-[24px] bottom-[3px] right-[3px] border-2 [&>svg]:w-[14px] [&>svg]:h-[14px]",
        l: "!w-[32px] !h-[32px] bottom-[4px] right-[4px] border-2 [&>svg]:w-[18px] [&>svg]:h-[18px]",
        xl: "!w-[36px] !h-[36px] bottom-[8px] right-[8px] border-3 [&>svg]:w-[22px] [&>svg]:h-[22px]",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

export default function Avatar({
  status = "edit",
  size,
  className,
  ...rest
}: AvatarProps & VariantProps<typeof avatarVariants> & VariantProps<typeof editVariants>) {
  return (
    <div className={twMerge(avatarVariants({ size }), className)} {...rest}>
      {status === "edit" ? (
        <span className={twMerge(editVariants({ size }))}>
          <Camera />
        </span>
      ) : (
        <span className={twMerge(status === "offline" ? "bg-gray-400" : "bg-green-500")} />
      )}
    </div>
  );
}
