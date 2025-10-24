import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

import { usePanelStore } from "@stores/usePanelStore";

import { NAV_ITEMS, type NavItem } from "./types";

export default function Nav() {
  const setTitle = usePanelStore((state) => state.setTitle);

  return (
    <nav className="border-wh/12 flex min-h-12 border-y md:h-15 md:min-h-15">
      <ol className="flex w-full">
        {NAV_ITEMS.map(({ path, Icon, label }: NavItem) => (
          <NavLink
            onClick={() => setTitle(label)}
            key={"panel:nav:" + path}
            to={path}
            className={({ isActive }) =>
              twMerge(
                "flex flex-1 items-center justify-center gap-1 select-none",
                "label-text-s sm:label-text-m",
                "border-b-2 transition-colors duration-150",
                isActive ? "border-wh text-wh" : "text-wh/60 hover:text-wh/90 border-transparent",
              )
            }
          >
            <li className="flex items-center gap-1">
              <Icon className="size-5" />
              <span className="hidden md:inline">{label}</span>
            </li>
          </NavLink>
        ))}
      </ol>
    </nav>
  );
}
