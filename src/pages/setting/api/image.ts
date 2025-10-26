import supabase from "@utils/supabase";

// 이미지 미리보기 URL 생성 (로컬 파일용)
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

// 이미지 미리보기 URL 정리
export function revokeImagePreview(url: string): void {
  if (url.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

// 아바타 이미지 업로드 (profile avatar_url 변경)
export async function uploadAvatarImage(file: File, userId: string): Promise<string | null> {
  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("이미지 파일만 업로드할 수 있습니다.");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `avatars/${userId}/${fileName}`;

    // Supabase Storage에 업로드
    const { error } = await supabase.storage.from("avatars").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true, // 같은 경로에 파일이 있으면 덮어쓰기
    });

    if (error) {
      throw new Error("아바타 업로드에 실패했습니다.");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return publicUrl;
  } catch {
    return null;
  }
}
