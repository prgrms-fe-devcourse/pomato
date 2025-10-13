import { Menu } from "lucide-react";
import { useState } from "react";

import Panel from "@layout/panel";

export default function Aside() {
  const [open, setIsOpen] = useState(false);
  return (
    <aside>
      {!open && (
        <button
          className="dark:bg-bl/40 border-wh/18 mt-[16px] mr-[16px] flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border-1"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="text-wh" width={16} height={16} />
        </button>
      )}
      {open && <Panel close={() => setIsOpen(false)} />}
    </aside>
  );
}
