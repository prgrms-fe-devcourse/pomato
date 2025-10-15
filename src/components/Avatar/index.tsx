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
/**
 * Avatar 컴포넌트
 *
 * 사용자의 프로필 이미지를 표시하며, 상태(`online`, `offline`, `edit`)나
 * 이미지 변경 기능(`edit`)을 지원합니다.
 *
 * - 기본적으로 원형 프로필 이미지를 렌더링합니다.
 * - `status="edit"`일 경우 카메라 아이콘이 나타나며, 이미지 업로드 input이 활성화됩니다.
 * - `status="online"`, `status="offline"`일 경우 각각 상태 표시 색상이 적용됩니다.
 *
 * @component
 * @example
 * // 기본 사용 예시
 * <Avatar src="/profile.jpg" size="m" />
 *
 * @example
 * // 편집 모드
 * <Avatar status="edit" />
 *
 * @example
 * // 온라인 상태 표시
 * <Avatar status="online" />
 *
 * @param {Object} props - Avatar 컴포넌트 속성
 * @param {string} [props.src] - 표시할 프로필 이미지 경로 (없으면 기본 아이콘 표시)
 * @param {"default" | "online" | "offline" | "edit"} [props.status="default"] - 아바타 상태
 * @param {string} [props.size] - `avatarVariants`에 정의된 크기 옵션
 * @param {string} [props.containerStyle] - 최상위 div에 추가할 사용자 정의 Tailwind 클래스
 * @param {string} [props.editStyle] - `edit` 모드 시 label에 추가할 스타일 (미사용 시 생략 가능)
 * @param {string} [props.statusStyle] - 상태 표시 라벨에 추가할 스타일 (미사용 시 생략 가능)
 * @param {string} [props.className] - `<img>` 태그에 추가할 클래스명
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} [rest] - 기타 `<img>` 태그 속성 (alt, loading 등)
 *
 * @returns {JSX.Element} 렌더링된 Avatar 컴포넌트
 */
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
