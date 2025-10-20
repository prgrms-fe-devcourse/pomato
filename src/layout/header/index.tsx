import { X } from "lucide-react";
import { NavLink } from "react-router";

import Button from "@components/Button";
import { useAuthStore } from "@features/auth/model/useAuthStore";
import supabase from "@utils/supabase";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  const isLoggedIn = useAuthStore((state) => !!state.session);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      resetAuth();
    } catch (error) {
      console.error("로그아웃 오류:", error);
      throw error;
    }
  };
  return (
    <header className="flex h-[60px] items-center justify-end px-[16px]">
      {isLoggedIn ? (
        <Button onClick={() => void handleLogout()}>로그아웃</Button>
      ) : (
        <div>
          <NavLink to="/login">
            <Button intent="subtle">로그인</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button>회원가입</Button>
          </NavLink>
        </div>
      )}
      <Button intent="reveal" onClick={onClose} composition="iconOnly">
        <X width={16} height={16} className="text-wh" />
      </Button>
    </header>
  );
}
