import { type VariantProps } from "class-variance-authority";
import { Camera, UserRound } from "lucide-react";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { editVariants, avatarVariants, DEFAULT_SIZE } from "@components/Avatar/variants";

interface AvatarProps
  extends ComponentPropsWithoutRef<"img">,
    VariantProps<typeof editVariants>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  status?: "default" | "online" | "offline" | "edit";
  containerStyle?: string;
  editStyle?: string;
  statusStyle?: string;
}

export default function Avatar({
  src,
  status = "default",
  size = DEFAULT_SIZE,
  containerStyle,
  className,
  ...rest
}: AvatarProps) {
  return (
    <div className={twMerge(avatarVariants({ size }), containerStyle)}>
      {typeof src === "string" ? (
        <img
          src={src}
          className={twMerge(
            "h-full w-full rounded-full object-cover object-[center_0%]",
            className,
          )}
          {...rest}
        />
      ) : (
        <UserRound className="text-wh/60" />
      )}
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
            className="hidden h-full w-full"
          />
          <Camera />
        </label>
      ) : (
        status !== "default" && (
          <label className={twMerge(status === "offline" ? "bg-gray-400" : "bg-green-500")} />
        )
      )}
    </div>
  );
}
