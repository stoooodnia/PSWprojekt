import React from "react";
import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../components/WelcomePage";
import Play from "../components/Play";
import NotFound from "../components/NotFound";
import Game from "../components/Game";
import Lobby from "../components/Lobby";
import Friends from "../components/Friends";
import Manual from "../components/Manual";
import Stats from "../components/Stats";
import Profile from "../components/Profile";
import ChangeDetails from "../components/ChangeDetails";
import AdminPage from "../components/AdminPage";
import { PrivateRoute } from "../utils/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/play",
    element: (
      <PrivateRoute component={Play} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "*",
    element: (
      <PrivateRoute component={NotFound} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/friends",
    element: (
      <PrivateRoute component={Friends} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/friends/:id",
    element: (
      <PrivateRoute component={Friends} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/manual",
    element: (
      <PrivateRoute component={Manual} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/stats",
    element: (
      <PrivateRoute component={Stats} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/game/:id",
    element: (
      <PrivateRoute component={Game} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/lobby",
    element: (
      <PrivateRoute component={Lobby} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <PrivateRoute component={Profile} roles={["APP-USER", "APP-ADMIN"]} />
    ),
  },
  {
    path: "/adminPage",
    element: <PrivateRoute component={AdminPage} roles={["APP-ADMIN"]} />,
  },
]);
