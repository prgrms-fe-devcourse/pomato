import { cva } from "class-variance-authority";
import { NavLink } from "react-router";

import { ROUTES } from "@type/router.types";

const authButton = cva(
  [
    "label-text-s sm:label-text-m inline-flex h-8 cursor-pointer items-center justify-center gap-1 rounded-md px-2.5",
    "transition-all duration-150",
    "focus-visible:ring-wh/12 outline-none focus-visible:ring-2",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
    "sm:h-10 sm:rounded-lg sm:px-4",
  ],
  {
    variants: {
      type: {
        login:
          "text-wh/65 hover:text-wh/90 active:text-wh/95 bg-transparent active:bg-transparent dark:active:bg-transparent",
        signup:
          "text-wh/80 bg-wh/15 hover:bg-wh/25 active:bg-wh/30 dark:bg-bl/25 dark:hover:bg-bl/35 dark:active:bg-bl/45",
      },
    },
  },
);

export default function AuthButton() {
  return (
    <div>
      <NavLink to={ROUTES.LOGIN} className={authButton({ type: "login" })}>
        로그인
      </NavLink>
      <NavLink to={ROUTES.SIGNUP} className={authButton({ type: "signup" })}>
        회원가입
      </NavLink>
    </div>
  );
}
