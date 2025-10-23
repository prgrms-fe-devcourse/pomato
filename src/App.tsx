import useAuth from "@features/auth/model/useAuth";
import Timer from "@features/timer";
import Main from "@layout/main";
import Panel from "@layout/panel";

export default function App() {
  useAuth();

  return (
    <Main>
      <Timer />
      <Panel />
    </Main>
  );
}
