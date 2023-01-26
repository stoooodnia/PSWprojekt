import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import CheckConnections from "./components/CheckConnections";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CheckConnections />
    <RouterProvider router={router} />
  </>
);
