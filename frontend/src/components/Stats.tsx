import React, { useEffect, useLayoutEffect, useState } from "react";
import NavBar from "./NavBar";
import Cookie from "js-cookie";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

type Stats = {
  gamesPlayed: number;
  gamesWon?: number;
  gamesLost?: number;
};

const getLoggedUserData = () => {
  return Cookie.get("userLoggedNickname");
};

const Stats = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();

  useLayoutEffect(() => {
    if (!keycloak.authenticated) {
      alert("Zaloguj się aby grać!");
      navigate("/");
    }
  });
  const [Stats, setStats] = useState({ gamesPlayed: 0 } as Stats);
  // CRUD 4 - GET - Get stats of logged user
  useEffect(() => {
    const loggedUserNickname = getLoggedUserData();
    fetch(`http://localhost:1337/api/stats/${loggedUserNickname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("pobrałem gry");
        setStats({ gamesPlayed: data.data.data.gamesPlayed });
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
      <div className="w-1/2">
        <NavBar />
        <div className="flex ml-5 font-semibold text-xl flex-col h-full">
          Zagrane gry: {Stats.gamesPlayed}
        </div>
      </div>
    </div>
  );
};

export default Stats;
