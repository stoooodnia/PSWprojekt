import React, { useMemo, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { randomSpy } from "../utils/randomSpy";
import { graczJa } from "../utils/samples";
import { friends } from "../utils/samples";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  profil: {
    nickname: string;
    email: string;
  };
}

type User = {
  nickname: string;
  email: string;
};

// TODO - ładowanie danych zalogowanego użytkownika z ciasteczek.
const getLoggedUserData = (): User => {
  return graczJa;
};

const Profile = () => {
  const [Profil, setProfil] = useState<User>({} as User);
  let spyClass = "";
  // TODO - ustawienie routingu z serwera, bo narazie to placeholder
  // CRUD 3 - GET - Get profile of logged user, or another user
  const { nickname } = useParams();
  useEffect(() => {
    const loggedUser = getLoggedUserData();
    if (nickname === "me") {
      fetch(`http://localhost:1337/profile/${loggedUser.nickname}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfil(data);
        });
    }
    fetch(`http://localhost:1337/profile/${nickname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfil(data);
      })
      .catch((err) => {
        console.log("nie znaleziono użytkownika");
        setProfil({
          nickname: "???",
          email: "Nie znaleziono",
        });
      });
  }, []);

  useMemo(() => {
    spyClass = randomSpy();
  }, [Profil]);

  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div id="right">
        <NavBar />
        <div id="main">
          <div className="flex justify-around">
            <FontAwesomeIcon className={spyClass} icon={faUserSecret} />
            <div>
              <h1 className="text-7xl">{Profil.nickname}</h1>
              <h2 className="text-5xl">{Profil.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
