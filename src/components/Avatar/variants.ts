import { cva } from "class-variance-authority";

export const DEFAULT_SIZE = "m";

export const avatarVariants = cva(
  "flex bg-wh/25 dark:bg-bl/40 justify-center items-center border-2 border-wh/15 relative [&_label]:absolute [&_label]:border-wh [&_label]:rounded-full",
  {
    variants: {
      size: {
        xxs: "w-[24px] h-[24px] rounded-[12px] [&_label]:w-[8px] [&_label]:h-[8px] [&_label]:border-1 [&_label]:left-[12px] [&_label]:top-[12px] [&>svg]:w-[12px] [&>svg]:h-[12px]",
        xs: "w-[32px] h-[32px] rounded-[16px] [&_label]:w-[12px] [&_label]:h-[12px] [&_label]:border-2 [&_label]:left-[18px] [&_label]:top-[18px] [&>svg]:w-[16px] [&>svg]:h-[16px]",
        s: "w-[40px] h-[40px] rounded-[20px] [&_label]:w-[14px] [&_label]:h-[14px] [&_label]:border-2 [&_label]:left-[24px] [&_label]:top-[24px] [&>svg]:w-[20px] [&>svg]:h-[20px]",
        m: "w-[52px] h-[52px] rounded-[26px] [&_label]:w-[16px] [&_label]:h-[16px] [&_label]:border-2 [&_label]:left-[30px] [&_label]:top-[30px] [&>svg]:w-[26px] [&>svg]:h-[26px]",
        l: "w-[80px] h-[80px] rounded-[40px] [&_label]:w-[20px] [&_label]:h-[20px] [&_label]:border-2 [&_label]:left-[52px] [&_label]:top-[52px] [&>svg]:w-[40px] [&>svg]:h-[40px]",
        xl: "w-[120px] h-[120px] rounded-[60px] [&_label]:w-[24px] [&_label]:h-[24px] [&_label]:border-3 [&_label]:left-[88px] [&_label]:top-[88px] [&>svg]:w-[60px] [&>svg]:h-[60px]",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

export const editVariants = cva(
  "absolute rounded-full border-wh bg-wh/90 dark:bg-bl/90 text-bl dark:text-wh flex items-center justify-center",
  {
    variants: {
      size: {
        xxs: "!w-[12px] !h-[12px] !top-[8px] !left-[8px] border-1 [&>svg]:w-[4px] [&>button>svg]:h-[4px]",
        xs: "!w-[16px] !h-[16px] !top-[12px] !left-[12px] border-2 [&>svg]:w-[6px] [&>button>svg]:h-[6px]",
        s: "!w-[20px] !h-[20px] !top-[16px] !left-[16px] border-2 [&>svg]:w-[10px] [&>button>svg]:h-[10px]",
        m: "!w-[24px] !h-[24px] !top-[26px] !left-[26px] border-2 [&>svg]:w-[14px] [&>button>svg]:h-[14px]",
        l: "!w-[32px] !h-[32px] !top-[42px] !left-[42px] border-2 [&>svg]:w-[18px] [&>button>svg]:h-[18px]",
        xl: "!w-[36px] !h-[36px] !top-[76px] !left-[76px] border-3 [&>svg]:w-[22px] [&>button>svg]:h-[22px]",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);
