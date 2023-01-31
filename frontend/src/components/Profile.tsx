import React, { useMemo } from "react";
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

const Profile = () => {
  let spyClass = "";

  const handleUserData = () => {
    const { nickname } = useParams();
    if (nickname === "me") {
      // CRUD 4 - Get my profile "me"
      // TODO - ustawienie routingu z serwera, bo narazie to placeholder
      const loggedUser = graczJa;
      fetch(`http://localhost:3000/profile/${loggedUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => console.log(res));
      return loggedUser;
    }
    // if (nickname === undefined) {
    //   const gracz = {
    //     nickname: "Nie znaleziono",
    //     email: "",
    //   };
    //   // const gracz = graczJa;
    //   return gracz;
    // }
    // TODO - adjust this function for clearness and functionality
    const gracz = friends.find((friend) => friend.nickname === nickname);
    return gracz;
  };

  useMemo(() => {
    spyClass = randomSpy();
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
      <div id="right">
        <NavBar />
        <div id="main">
          <div className="flex justify-around">
            <FontAwesomeIcon className={spyClass} icon={faUserSecret} />
            <div>
              <h1 className="text-7xl">{handleUserData()?.nickname}</h1>
              <h2 className="text-5xl">{handleUserData()?.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
