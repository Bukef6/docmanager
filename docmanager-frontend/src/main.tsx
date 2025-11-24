import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000, // zobrazenie na 4 sekundy
        style: {
          background: "#333",
          color: "#fff",
          padding: "12px 16px",
          fontSize: "16px",
          borderRadius: "10px",
        },
        success: {
          style: {
            background: "#16a34a",
          },
        },
        error: {
          style: {
            background: "#dc2626",
          },
        },
      }}
    />
  </StrictMode>
);
