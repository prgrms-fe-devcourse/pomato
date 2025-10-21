import { Menu } from "lucide-react";
import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";

import Button from "@components/Button";
import Header from "@layout/header";
import Nav from "@layout/nav";
import { useIsPanelOpen, usePanelStore } from "@stores/usePanelStore";

export default function Panel() {
  const isOpen = useIsPanelOpen();
  const close = usePanelStore((state) => state.close);
  const open = usePanelStore((state) => state.open);
  return (
    <>
      {isOpen ? (
        <section
          className={twMerge(
            "flex min-h-0 w-full flex-col self-stretch overflow-hidden",
            "min-[801px]:w-[40%] min-[801px]:max-w-[650px] min-[801px]:min-w-[576px] min-[801px]:shrink-0",
            "bg-wh/18 dark:bg-bl/18 border-wh/12 dark:border-wh/8 rounded-[8px] border-1",
            "shadow backdrop-blur-[12px]",
          )}
          aria-label="Panel"
        >
          <Header onClose={close} />
          <Nav />
          <Outlet />
        </section>
      ) : (
        <Button
          onClick={open}
          composition={"iconOnly"}
          className="absolute top-4 right-4"
          aria-label="Panel Open Button"
        >
          <Menu />
        </Button>
      )}
    </>
  );
}
