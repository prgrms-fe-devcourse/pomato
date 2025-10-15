import { X } from "lucide-react";
import { NavLink } from "react-router";

import Button from "@components/Button";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  return (
    <header className="flex h-[60px] items-center justify-end px-[16px]">
      <NavLink to="/login">
        <Button intent="subtle">로그인</Button>
      </NavLink>
      <NavLink to="/signup">
        <Button>회원가입</Button>
      </NavLink>
      <Button intent="reveal" onClick={onClose} composition="iconOnly">
        <X width={16} height={16} className="text-wh" />
      </Button>
    </header>
  );
}
