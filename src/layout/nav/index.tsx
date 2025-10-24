import { motion } from "motion/react";
import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";

import { usePanelStore } from "@stores/usePanelStore";

import { NAV_ITEMS, type NavItem } from "./types";

export default function Nav() {
  const setTitle = usePanelStore((state) => state.setTitle);

  return (
    <nav className="border-wh/12 h-12 border-y md:h-15">
      <ol className="flex h-full w-full items-stretch">
        {NAV_ITEMS.map(({ path, Icon, label }: NavItem) => (
          <li key={path} className="relative min-w-0 flex-1">
            <NavLink
              to={path}
              onClick={() => setTitle(label)}
              className={({ isActive }) =>
                twMerge("block h-full w-full", isActive ? "text-wh" : "text-wh/60 hover:text-wh/90")
              }
              children={({ isActive }) => (
                <div className="label-text-s sm:label-text-m relative flex h-full items-center justify-center gap-1 select-none">
                  <Icon className="size-5 shrink-0" />
                  <span className="hidden truncate md:inline">{label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="panel-underline"
                      className="bg-wh/70 dark:bg-wh/60 absolute right-0 bottom-0 left-0 h-0.5"
                      transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.2 }}
                    />
                  )}
                </div>
              )}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
