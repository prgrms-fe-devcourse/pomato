import supabase from "@utils/supabase";

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("세션 조회 오류:", error);
    return null;
  }

  return session;
};
