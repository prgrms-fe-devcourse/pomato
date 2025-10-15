import { cva } from "class-variance-authority";

export const DEFAULT_SIZE = "m";

export const avatarVariants = cva(
  "bg-wh/25 dark:bg-bl/40 border-wh/15 [&_label]:border-wh relative flex items-center justify-center border-2 [&_label]:absolute [&_label]:rounded-full",
  {
    variants: {
      size: {
        xxs: "h-[24px] w-[24px] rounded-[12px] [&_label]:top-[12px] [&_label]:left-[12px] [&_label]:h-[8px] [&_label]:w-[8px] [&_label]:border-1 [&>svg]:h-[12px] [&>svg]:w-[12px]",
        xs: "h-[32px] w-[32px] rounded-[16px] [&_label]:top-[18px] [&_label]:left-[18px] [&_label]:h-[12px] [&_label]:w-[12px] [&_label]:border-2 [&>svg]:h-[16px] [&>svg]:w-[16px]",
        s: "h-[40px] w-[40px] rounded-[20px] [&_label]:top-[24px] [&_label]:left-[24px] [&_label]:h-[14px] [&_label]:w-[14px] [&_label]:border-2 [&>svg]:h-[20px] [&>svg]:w-[20px]",
        m: "h-[52px] w-[52px] rounded-[26px] [&_label]:top-[30px] [&_label]:left-[30px] [&_label]:h-[16px] [&_label]:w-[16px] [&_label]:border-2 [&>svg]:h-[26px] [&>svg]:w-[26px]",
        l: "h-[80px] w-[80px] rounded-[40px] [&_label]:top-[52px] [&_label]:left-[52px] [&_label]:h-[20px] [&_label]:w-[20px] [&_label]:border-2 [&>svg]:h-[40px] [&>svg]:w-[40px]",
        xl: "h-[120px] w-[120px] rounded-[60px] [&_label]:top-[88px] [&_label]:left-[88px] [&_label]:h-[24px] [&_label]:w-[24px] [&_label]:border-3 [&>svg]:h-[60px] [&>svg]:w-[60px]",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

export const editVariants = cva(
  "border-wh bg-wh/90 dark:bg-bl/90 text-bl dark:text-wh absolute flex items-center justify-center rounded-full",
  {
    variants: {
      size: {
        xxs: "!top-[8px] !left-[8px] !h-[12px] !w-[12px] border-1 [&>button>svg]:h-[4px] [&>svg]:w-[4px]",
        xs: "!top-[12px] !left-[12px] !h-[16px] !w-[16px] border-2 [&>button>svg]:h-[6px] [&>svg]:w-[6px]",
        s: "!top-[16px] !left-[16px] !h-[20px] !w-[20px] border-2 [&>button>svg]:h-[10px] [&>svg]:w-[10px]",
        m: "!top-[26px] !left-[26px] !h-[24px] !w-[24px] border-2 [&>button>svg]:h-[14px] [&>svg]:w-[14px]",
        l: "!top-[42px] !left-[42px] !h-[32px] !w-[32px] border-2 [&>button>svg]:h-[18px] [&>svg]:w-[18px]",
        xl: "!top-[76px] !left-[76px] !h-[36px] !w-[36px] border-3 [&>button>svg]:h-[22px] [&>svg]:w-[22px]",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);
