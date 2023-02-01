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
  const navigate = useNavigate();
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
          email: "Nie znaleziono profilu",
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
      <div id="right" className="w-1/2">
        <NavBar />
        <div id="main ">
          <div className="flex gap-10 ml-1">
            <FontAwesomeIcon className={spyClass} icon={faUserSecret} />
            <div>
              <h1 className="text-7xl">{Profil.nickname}</h1>
              <h2 className="text-5xl">{Profil.email}</h2>
            </div>
          </div>
          <button
            hidden={nickname === "me" ? false : true}
            onClick={() => {
              navigate("/profile/details");
            }}
            className="mt-5 w-42 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
          >
            {" "}
            zmień dane{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
