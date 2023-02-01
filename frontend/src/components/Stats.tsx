import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { graczJa } from "../utils/samples";

type Stats = {
  gamesPlayed: number;
  gamesWon?: number;
  gamesLost?: number;
};

type User = {
  nickname: string;
  email: string;
};

// TODO - ładowanie danych zalogowanego użytkownika z ciasteczek.
const getLoggedUserData = (): User => {
  return graczJa;
};

const Stats = () => {
  const [Stats, setStats] = useState({} as Stats);
  // CRUD 4 - GET - Get stats of logged user
  useEffect(() => {
    const loggedUser = getLoggedUserData();
    fetch(`http://localhost:1337/stats/${loggedUser.nickname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });
  }, []);
  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default Stats;
