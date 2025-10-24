import { z } from "zod";

// 아이디: 소문자/숫자/_ 3~20자
export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3, { message: "아이디는 최소 3자 이상이어야 해요." })
  .max(20, { message: "아이디는 최대 20자까지 가능해요." })
  .regex(/^[a-z0-9_]+$/, { message: "아이디는 소문자, 숫자, 밑줄(_)만 사용할 수 있어요." });

// 디스플레이 네임: 1~50자 (이모지/한글/공백 OK)
export const displayNameSchema = z
  .string()
  .trim()
  .min(1, { message: "이름은 최소 1자 이상이어야 해요." })
  .max(50, { message: "이름은 최대 50자까지 가능해요." });

// bio: 선택, 최대 200자 (빈 문자열 허용)
export const bioSchema = z
  .string()
  .trim()
  .max(200, { message: "자기소개는 200자 이내로 작성해주세요." })
  .default("");
