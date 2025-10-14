import { X } from "lucide-react";
import { NavLink, Outlet } from "react-router";

interface PanelProps {
  close: () => void;
}

export default function Panel({ close }: PanelProps) {
  return (
    <div className="dark:bg-bl/30 border-wh/8 min-h-full w-[576px] border-1">
      <header className="flex h-[60px] justify-end px-[8px]">
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
        <button onClick={close}>
          <X width={16} height={16} className="text-wh" />
        </button>
      </header>
      <nav>
        <NavLink to="/mate">메이트</NavLink>
        <NavLink to="/feed">피드</NavLink>
        <NavLink to="/chart">차트</NavLink>
        <NavLink to="/notification">내 소식</NavLink>
        <NavLink to="/setting">설정</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
