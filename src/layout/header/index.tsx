import { X } from "lucide-react";
import { NavLink } from "react-router";

type HeaderProps = {
  onClose: () => void;
};

export default function Header({ onClose }: HeaderProps) {
  return (
    <header className="flex h-[60px] justify-end px-[8px]">
      <NavLink to="/login">로그인</NavLink>
      <NavLink to="/signup">회원가입</NavLink>
      <button onClick={onClose}>
        <X width={16} height={16} className="text-wh" />
      </button>
    </header>
  );
}
