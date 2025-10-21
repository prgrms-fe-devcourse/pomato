import supabase from "@utils/supabase";

export async function uploadPostImage(file: File, postId: string): Promise<string | null> {
  try {
    if (!file.type.startsWith("image/")) {
      throw new Error("이미지 파일만 업로드할 수 있습니다.");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${postId}/${fileName}`;

    // Supabase Storage에 업로드
    const { error } = await supabase.storage.from("post_image").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      throw new Error("이미지 업로드에 실패했습니다.");
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("post_image").getPublicUrl(filePath);

    return publicUrl;
  } catch {
    return null;
  }
}

// 이미지 삭제 함수 (게시글 삭제 시 사용)
export async function deletePostImage(imageUrl: string): Promise<boolean> {
  try {
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split("/");
    const bucketIndex = pathParts.indexOf("post_image");
    if (bucketIndex === -1 || bucketIndex + 1 >= pathParts.length) {
      return false;
    }
    const filePath = pathParts.slice(bucketIndex + 1).join("/");

    const { error } = await supabase.storage.from("post_image").remove([filePath]);

    if (error) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

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
