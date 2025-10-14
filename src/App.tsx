import { RouterProvider } from "react-router";

import Overlay from "@layout/overlay";
import { router } from "@routes/routes";

function App() {
  return (
    <>
      <Overlay>
        <section className="flex-1">TIMER</section>
        <RouterProvider router={router} />
      </Overlay>
    </>
  );
}

export default App;
