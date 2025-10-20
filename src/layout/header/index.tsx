import { X } from "lucide-react";

import Button from "@components/Button";
import { useAuthStore, useIsLoggedIn } from "@features/auth/model/useAuthStore";
import LoginButton from "@features/auth/ui/LoginButton";
import supabase from "@utils/supabase";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  const panelTitle = "테스트";

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
    <header className="flex h-12 items-center justify-between pr-2 pl-4 md:h-15 md:pr-2.5 md:pl-4.5">
      <div className="flex min-w-0 items-baseline">
        <h2 className="label-text-m truncate">{panelTitle}</h2>
      </div>
      <div className="flex items-center gap-1">
        <div>
          {useIsLoggedIn() ? (
            <Button onClick={() => void handleLogout()}>로그아웃</Button>
          ) : (
            <LoginButton />
          )}
        </div>
        <div>
          <Button
            onClick={onClose}
            intent="subtle"
            composition="iconOnly"
            className="active:bg-transparent dark:active:bg-transparent"
            aria-label="Close Panel"
          >
            <X />
          </Button>
        </div>
      </div>
    </header>
  );
}
