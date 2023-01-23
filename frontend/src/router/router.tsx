import React from "react";
import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import RegisterPage from "../components/RegisterPage";
import Play from "../components/Play";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/friends",
    element: <div>nie masz przyjaciół :c</div>,
  },
  {
    path: "/manual",
    element: <div>lol</div>,
  },
  {
    path: "/stats",
    element: <div>debil: 1</div>,
  },
]);
