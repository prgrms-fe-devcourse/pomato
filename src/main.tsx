import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "@routes/routes.tsx";
import "./styles/global.css";
import RealtimeProvider from "@services/RealtimeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RealtimeProvider>
      <RouterProvider router={router} />
    </RealtimeProvider>
  </StrictMode>,
);
