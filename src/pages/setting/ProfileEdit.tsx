import { User, AtSign } from "lucide-react";
import { useEffect, useState, useRef, type FormEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import { Toast } from "@components/Toast";
import type { ToastIntent } from "@components/Toast/intent";
import { getProfile } from "@features/auth/api/profile";
import { useIsMobile } from "@hooks/useIsMobile";
import { uploadAvatarImage, revokeImagePreview } from "@pages/setting/api/image";
import { useUserId } from "@stores/useAuthStore";
import type { Profile } from "@type/auth.types";
import supabase from "@utils/supabase";

type ToastType = { message: string; intent: ToastIntent };

type LocalImage = {
  id: string;
  image_url: string;
  file: File;
};

export default function ProfileEdit() {
  const isMobile = useIsMobile();
  const userId = useUserId();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [avatarImage, setAvatarImage] = useState<LocalImage | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToast = (intent: ToastType["intent"], message: string) => setToast({ message, intent });

  // 현재 로그인한 사용자의 프로필 정보를 업데이트
  const updateProfile = async (
    uid: string,
    updateData: Partial<Profile>,
  ): Promise<Profile | null> => {
    // profiles 테이블에서 현재 사용자의 user_id에 해당하는 레코드를 찾아서 업데이트
    const { data, error } = await supabase
      .from("profiles")
      .update({
        display_name: updateData.display_name || "",
        username: updateData.username || "",
        bio: String(updateData.bio || ""),
        avatar_url: updateData.avatar_url ?? null, // 아바타 URL 업데이트
      })
      .eq("user_id", uid) // 현재 로그인한 사용자의 user_id와 일치하는 레코드만 업데이트
      .select()
      .single();

    if (error) {
      showToast("error", "저장에 실패했어요");
      return null;
    }

    showToast("success", "저장에 성공했어요");
    return data;
  };

  // 아바타 이미지 업로드 핸들러
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file || !file.type.startsWith("image/")) {
      showToast("error", "이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 기존 이미지 정리
    if (avatarImage) {
      revokeImagePreview(avatarImage.image_url);
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarImage({
      id: crypto.randomUUID(),
      image_url: previewUrl,
      file,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 아바타 클릭 핸들러
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const p = await getProfile(userId);
      setProfile(p);
    };
    void fetchProfile();
  }, [userId]);

  // 컴포넌트 언마운트 시 이미지 정리
  useEffect(() => {
    return () => {
      if (avatarImage) {
        revokeImagePreview(avatarImage.image_url);
      }
    };
  }, [avatarImage]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (isLoading || isUploadingAvatar) return;

    setIsLoading(true);

    (async () => {
      try {
        const formData = new FormData(event.currentTarget);
        const display_name = formData.get("display_name");
        const username = formData.get("username");
        const bio = formData.get("bio");

        if (!userId) {
          showToast("error", "메이트 님의 정보를 찾지 못했어요");
          return;
        }

        let avatarUrl = profile?.avatar_url;

        // 아바타 이미지가 선택된 경우 Supabase Storage에 업로드
        if (avatarImage) {
          setIsUploadingAvatar(true);
          // 현재 사용자의 user_id를 사용하여 아바타 이미지 업로드
          const uploadedUrl = await uploadAvatarImage(avatarImage.file, userId);
          if (uploadedUrl) {
            avatarUrl = uploadedUrl;
          } else {
            showToast("error", "아바타 업로드에 실패했습니다.");
            return;
          }
          setIsUploadingAvatar(false);
        }

        // 업데이트할 프로필 데이터 준비
        const updateData: Partial<Profile> = {
          display_name: typeof display_name === "string" ? display_name : "",
          username: typeof username === "string" ? username : "",
          bio: typeof bio === "string" ? bio : "",
          avatar_url: avatarUrl, // 새로운 아바타 URL (또는 기존 URL 유지)
        };

        // profiles 테이블에서 현재 사용자의 user_id에 해당하는 레코드 업데이트
        const newProfile = await updateProfile(userId, updateData);
        if (newProfile) {
          setProfile(newProfile);
          // 성공 시 로컬 이미지 정리
          if (avatarImage) {
            revokeImagePreview(avatarImage.image_url);
            setAvatarImage(null);
          }
        }
      } catch {
        showToast("error", "저장 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
        setIsUploadingAvatar(false);
      }
    })();
  };

  return (
    <section className="pc-scroll flex min-h-0 flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:gap-10 md:px-8 md:py-12">
      <header className="flex flex-col items-center justify-center gap-4 sm:gap-5">
        <div className="relative select-none">
          <Avatar
            src={avatarImage?.image_url ?? profile?.avatar_url ?? undefined}
            status="edit"
            size={isMobile ? "l" : "xl"}
            onClick={handleAvatarClick}
          />

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
            disabled={isLoading || isUploadingAvatar}
          />
        </div>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h3 className="heading-text-xs sm:heading-text-s md:heading-text-m text-center">
            오랜만이에요
          </h3>
          <p className="label-text-xs sm:label-text-s text-center opacity-90">
            함께 집중하는 메이트들에게 나를 소개해요
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col justify-center gap-4 sm:gap-5"
      >
        <div className="space-y-1.5">
          <label htmlFor="displayName" className="label-text-xs">
            이름
          </label>
          <Input
            id="displayName"
            name="display_name"
            type="text"
            placeholder="이름을 입력해주세요"
            Icon={{ Component: User, align: "left" }}
            defaultValue={profile?.display_name}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="username" className="label-text-xs">
            아이디
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="아이디를 입력해주세요"
            Icon={{ Component: AtSign, align: "left" }}
            defaultValue={profile?.username}
          />
          <p className="label-text-xs pl-1 opacity-70">
            영문 소문자, 숫자, 밑줄(_) 조합을 권장해요.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="bio" className="label-text-xs">
            소개
          </label>
          <div className="relative">
            <textarea
              id="bio"
              name="bio"
              rows={5}
              placeholder="자신을 소개해주세요"
              className={twMerge(
                "paragraph-text-s pc-scroll min-h-[100px] w-full flex-1 resize-none rounded-lg border px-4 py-2.5",
                "bg-wh/20 dark:bg-bl/30 border-wh/15 dark:border-wh/12 text-wh placeholder:text-wh/50",
                "transition-colors duration-150 ease-out",
                "hover:bg-wh/25 hover:dark:bg-bl/40",
                "focus:bg-wh/30 focus:dark:bg-bl/45 focus:border-wh/30 focus:dark:border-wh/25",
                "active:bg-wh/35 active:dark:bg-bl/55",
                "ring-0 focus:shadow-[0_0_0_1px_rgba(250,250,250,0.06)] focus:ring-0 focus:outline-none",
                "disabled:bg-wh/10 disabled:border-wh/10 disabled:dark:bg-bl/20 disabled:dark:border-wh/8 disabled:text-wh/50 disabled:placeholder:text-wh/50 disabled:cursor-not-allowed disabled:opacity-60",
                "pc-scroll outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-0",
              )}
              defaultValue={String(profile?.bio || "")}
            />
          </div>
        </div>

        <div className="mt-2 flex gap-3 sm:gap-4">
          {/* <Button
            intent="ghost"
            className="h-10 flex-1 sm:h-11"
            disabled={isLoading || isUploadingAvatar}
          >
            취소
          </Button> */}
          <Button
            type="submit"
            intent="primary"
            className="h-10 flex-1 sm:h-11"
            disabled={isLoading || isUploadingAvatar}
          >
            {isLoading || isUploadingAvatar ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>

      {toast && (
        <Toast message={toast.message} intent={toast.intent} onClose={() => setToast(null)} />
      )}
    </section>
  );
}
