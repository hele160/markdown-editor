import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "@/components/Layout";
import "./styles/variables.scss";
import "./styles/reset.scss";
import "./styles/global.scss";

import "highlight.js/styles/github.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
);
