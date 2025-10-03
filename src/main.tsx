import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import Text from "./Text.tsx";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 실제 페이지  */}
    <App />
    {/* 디자인 토큰 확인 페이지 */}
    <Text />
  </StrictMode>,
);
