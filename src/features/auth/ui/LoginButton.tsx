import { NavLink } from "react-router";

import Button from "@components/Button";
import { ROUTES } from "@type/router.types";

export default function LoginButton() {
  return (
    <>
      <NavLink to={ROUTES.LOGIN}>
        <Button intent="subtle" className="active:bg-transparent dark:active:bg-transparent">
          로그인
        </Button>
      </NavLink>
      <NavLink to={ROUTES.SIGNUP}>
        <Button intent="ghost">회원가입</Button>
      </NavLink>
    </>
  );
}
