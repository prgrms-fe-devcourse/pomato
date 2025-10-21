import { useEffect, useState } from "react";

import supabase from "@utils/supabase";

interface UserProfile {
  user_id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
}

export function useCurrentUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        // 현재 로그인된 사용자 정보 가져오기
        const { data: authData } = await supabase.auth.getUser();

        if (!authData.user) {
          setUser(null);
          setLoading(false);
          return;
        }

        // profiles 테이블에서 사용자 프로필 정보 가져오기
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("user_id, username, display_name, avatar_url")
          .eq("user_id", authData.user.id)
          .single();

        if (error) {
          console.error("프로필 정보 가져오기 실패:", error.message);
          setUser(null);
        } else {
          setUser(profileData);
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 중 오류:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    void getCurrentUser();

    // 인증 상태 변화 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        await getCurrentUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
