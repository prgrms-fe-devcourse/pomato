import { type VariantProps } from "class-variance-authority";
import { Camera } from "lucide-react";
import { useRef, useState, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { editVariants, avatarVariants } from "@components/Avatar/variants";

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
