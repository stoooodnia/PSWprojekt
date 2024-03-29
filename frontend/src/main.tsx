import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import CheckConnections from "./components/CheckConnections";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <CheckConnections />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
);
