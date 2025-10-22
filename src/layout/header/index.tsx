import { X } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router";

import Button from "@components/Button";
import LoginButton from "@features/auth/ui/LoginButton";
import { useAuthStore, useIsLoggedIn } from "@stores/useAuthStore";
import { usePanelStore, usePanelTitle } from "@stores/usePanelStore";
import supabase from "@utils/supabase";

import { getPanelTitle } from "./constants";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  const panelTitle = usePanelTitle();
  const setTitle = usePanelStore((state) => state.setTitle);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const { pathname } = useLocation();
  const isLoggedIn = useIsLoggedIn();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error("로그아웃 오류");

    resetAuth();
  };

  useEffect(() => {
    const title = getPanelTitle(pathname);
    setTitle(title);
  }, [pathname, setTitle]);

  return (
    <header className="sticky top-0 z-20 flex h-12 shrink-0 items-center justify-between pr-2 pl-4 md:h-15 md:pr-2.5 md:pl-4.5">
      <div className="flex min-w-0 items-baseline">
        <h2 className="label-text-m truncate">{panelTitle}</h2>
      </div>
      <div className="flex items-center gap-1">
        <div>
          {isLoggedIn ? (
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
