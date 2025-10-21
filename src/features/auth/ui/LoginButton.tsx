import { NavLink } from "react-router";

import Button from "@components/Button";

export default function LoginButton() {
  return (
    <>
      <NavLink to="/login">
        <Button intent="subtle" className="active:bg-transparent dark:active:bg-transparent">
          로그인
        </Button>
      </NavLink>
      <NavLink to="/signup">
        <Button intent="ghost">회원가입</Button>
      </NavLink>
    </>
  );
}
