import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

import Button from "@components/Button";
import Header from "@layout/header";
import Nav from "@layout/nav";

export default function Panel() {
  const [open, setIsOpen] = useState(false);
  return (
    <>
      {open ? (
        <div
          className="bg-wh/18 dark:bg-bl/18 border-wh/12 dark:border-wh/8 min-h-full w-[560px] rounded-[8px] border-1 backdrop-blur-[12px]"
          aria-label="panel"
        >
          <Header onClose={() => setIsOpen(false)} />
          <Nav />
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Button composition={"iconOnly"} onClick={() => setIsOpen(true)} aria-label="panel button">
          <Menu className="text-wh" width={16} height={16} />
        </Button>
      )}
    </>
  );
}
