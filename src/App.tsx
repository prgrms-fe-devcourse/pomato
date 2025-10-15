import Timer from "@features/timer";
import Overlay from "@layout/overlay";
import Panel from "@layout/panel";

function App() {
  return (
    <main className="min-h-dvh w-full">
      <Overlay>
        <Timer />
        <Panel />
      </Overlay>
    </main>
  );
}

export default App;
