import Timer from "@features/timer";
import Panel from "@layout/panel";

function App() {
  return (
    <main className="flex min-h-dvh w-full items-stretch bg-[radial-gradient(106.3%_106.3%_at_20%_30%,rgba(168,85,247,0.25)_0%,rgba(0,0,0,0)_40%),radial-gradient(113.14%_113.14%_at_80%_20%,rgba(236,72,153,0.20)_0%,rgba(0,0,0,0)_40%),radial-gradient(100%_100%_at_40%_80%,rgba(59,130,246,0.20)_0%,rgba(0,0,0,0)_40%),radial-gradient(70.71%_70.71%_at_50%_50%,rgba(23,23,27,0.50)_0%,rgba(23,23,27,0.75)_100%)] bg-cover bg-no-repeat pt-[16px] pr-[16px] pb-[16px]">
      <Timer />
      <Panel />
    </main>
  );
}

export default App;
