import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

import Header from "@layout/header";
import Nav from "@layout/nav";

export default function Panel() {
  const [open, setIsOpen] = useState(false);
  return (
    <div>
      {open ? (
        <div className="dark:bg-bl/30 border-wh/8 min-h-full w-[576px] border-1">
          <Header onClose={() => setIsOpen(false)} />
          <Nav />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <button
          className="dark:bg-bl/40 border-wh/18 mt-[16px] mr-[16px] flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border-1"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="text-wh" width={16} height={16} />
        </button>
      )}
    </div>
  );
}
