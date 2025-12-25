// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./Routes/Routes";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./pages/shared/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
