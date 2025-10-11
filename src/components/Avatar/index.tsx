import { cva, type VariantProps } from "class-variance-authority";
import { Camera } from "lucide-react";
import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

const DEFAULT_SIZE = "m";

const avatarVariants = cva(
  "border-2 border-wh/15 bg-wh relative [&_label]:absolute [&_label]:border-wh [&_label]:rounded-full",
  {
    variants: {
      size: {
        xxs: "w-[24px] h-[24px] rounded-[12px] [&_label]:w-[8px] [&_label]:h-[8px] [&_label]:border-1 [&_label]:left-[12px] [&_label]:top-[12px]",
        xs: "w-[32px] h-[32px] rounded-[16px] [&_label]:w-[12px] [&_label]:h-[12px] [&_label]:border-2 [&_label]:left-[18px] [&_label]:top-[18px]",
        s: "w-[40px] h-[40px] rounded-[20px] [&_label]:w-[14px] [&_label]:h-[14px] [&_label]:border-2 [&_label]:left-[24px] [&_label]:top-[24px]",
        m: "w-[52px] h-[52px] rounded-[26px] [&_label]:w-[16px] [&_label]:h-[16px] [&_label]:border-2 [&_label]:left-[30px] [&_label]:top-[30px]",
        l: "w-[80px] h-[80px] rounded-[40px] [&_label]:w-[20px] [&_label]:h-[20px] [&_label]:border-2 [&_label]:left-[52px] [&_label]:top-[52px]",
        xl: "w-[120px] h-[120px] rounded-[60px] [&_label]:w-[24px] [&_label]:h-[24px] [&_label]:border-3 [&_label]:left-[88px] [&_label]:top-[88px]",
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

interface AvatarProps
  extends ComponentPropsWithoutRef<"img">,
    VariantProps<typeof editVariants>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  status?: string;
  containerStyle?: string;
  editStyle?: string;
  statusStyle?: string;
}

export default function Avatar({
  src,
  status = "online",
  size,
  containerStyle,
  className,
  ...rest
}: AvatarProps) {
  const [imgUrl, setImgUrl] = useState(src);
  const imgRef = useRef<HTMLInputElement>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadFile = files[0];

    const previewUrl = URL.createObjectURL(uploadFile);
    setImgUrl(previewUrl);

    const formData = new FormData();
    formData.append("file", uploadFile);
    // api 변경 예정
  };

  return (
    <div className={twMerge(avatarVariants({ size }), containerStyle)}>
      <img
        src={imgUrl}
        className={twMerge("h-full w-full rounded-full object-cover object-[center_0%]", className)}
        {...rest}
      />
      {status === "edit" ? (
        <label
          className={twMerge(
            "flex cursor-pointer items-center justify-center",
            editVariants({ size }),
          )}
        >
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            name="avatar_profile_img"
            onChange={onChangeImage}
            ref={imgRef}
            className="hidden h-full w-full"
          />
          <Camera />
        </label>
      ) : (
        <label className={twMerge(status === "offline" ? "bg-gray-400" : "bg-green-500")} />
      )}
    </div>
  );
}
