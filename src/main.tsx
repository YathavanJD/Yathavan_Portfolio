import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./lib/motion"; // registers GSAP plugins once
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
