import { NavLink } from "react-router";

import { ROUTES } from "@type/router.types";

export default function LoginButton() {
  return (
    <div>
      <NavLink
        to={ROUTES.LOGIN}
        className="focus-visible:ring-wh/12 text-wh/65 hover:text-wh/90 active:text-wh/95 label-text-s sm:label-text-m inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-md bg-transparent px-2.5 transition-all duration-150 outline-none focus-visible:ring-2 active:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 sm:h-10 sm:rounded-lg sm:px-4 dark:active:bg-transparent"
      >
        로그인
      </NavLink>
      {/* <NavLink
        to={ROUTES.SIGNUP}
        className="text-wh/80 focus-visible:ring-wh/12 bg-wh/15 hover:bg-wh/25 active:bg-wh/30 dark:bg-bl/25 dark:hover:bg-bl/35 dark:active:bg-bl/45 label-text-s sm:label-text-m inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-md px-2.5 transition-all duration-150 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 sm:h-10 sm:rounded-lg sm:px-4"
      >
        회원가입
      </NavLink> */}
    </div>
  );
}
