import React from "react";
import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import RegisterPage from "../components/RegisterPage";
import Play from "../components/Play";
import NotFound from "../components/NotFound";
import Game from "../components/Game";
import Lobby from "../components/Lobby";
import Friends from "../components/Friends";
import Manual from "../components/Manual";
import Stats from "../components/Stats";
import Profile from "../components/Profile";

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
    element: <Friends />,
  },
  {
    path: "/manual",
    element: <Manual />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
  {
    path: "/game/:id",
    element: <Game />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);
