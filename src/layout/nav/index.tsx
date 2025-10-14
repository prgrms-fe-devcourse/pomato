import { NavLink } from "react-router";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/mate">메이트</NavLink>
      <NavLink to="/feed">피드</NavLink>
      <NavLink to="/chart">차트</NavLink>
      <NavLink to="/notification">내 소식</NavLink>
      <NavLink to="/setting">설정</NavLink>
    </nav>
  );
}
