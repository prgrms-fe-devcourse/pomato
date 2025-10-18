import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

import Button from "@components/Button";
import Header from "@layout/header";
import Nav from "@layout/nav";

export default function Panel() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen ? (
        <section
          className={twMerge(
            "flex min-h-0 w-full flex-col self-stretch overflow-hidden",
            "min-[800px]:w-[40%] min-[800px]:max-w-[650px] min-[800px]:min-w-[576px] min-[800px]:shrink-0",
            "bg-wh/18 dark:bg-bl/18 border-wh/12 dark:border-wh/8 rounded-[8px] border-1",
            "shadow backdrop-blur-[12px]",
          )}
          aria-label="Panel"
        >
          <Header onClose={() => setIsOpen(false)} />
          <Nav />
          <Outlet />
        </section>
      ) : (
        <Button
          composition={"iconOnly"}
          onClick={() => setIsOpen(true)}
          aria-label="Panel button"
          className="absolute top-4 right-4"
        >
          <Menu className="text-wh" width={16} height={16} />
        </Button>
      )}
    </>
  );
}
