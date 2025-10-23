import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "@routes/routes.tsx";
import RealtimeProvider from "@services/RealtimeProvider";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RealtimeProvider>
      <RouterProvider router={router} />
    </RealtimeProvider>
  </StrictMode>,
);
