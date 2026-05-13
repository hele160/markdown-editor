import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// 全局样式（顺序：先变量，再重置，最后全局）
import "./styles/variables.scss";
import "./styles/reset.scss";
import "./styles/global.scss";

// highlight.js 代码高亮样式
import "highlight.js/styles/github.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
