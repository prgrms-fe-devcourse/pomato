import { NavLink } from "react-router";

import Button from "@components/Button";
import { NAV_TYPE, type NavType } from "@layout/nav/type";

export default function Nav() {
  return (
    <nav className="border-wh/15 dark:border-wh/8 flex h-[60px] items-center justify-around rounded-[8px] border-1 px-[16px]">
      {NAV_TYPE.map(({ path, Icon, label }: NavType) => {
        return (
          <NavLink
            key={"panel:nav:" + path}
            to={path}
            className={({ isActive }) =>
              isActive
                ? "active [&_button]:bg-wh/20 [&_button]:border-wh/12 [&_button]:dark:bg-bl/40 [&_button]:dark:border-wh/8 [&_button]:text-wh [&_button]:border-1"
                : ""
            }
          >
            <Button intent="subtle">
              <Icon />
              {label}
            </Button>
          </NavLink>
        );
      })}
    </nav>
  );
}
