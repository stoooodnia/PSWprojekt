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

type User = {
  nickname: string;
  email: string;
};

const Profile = () => {
  let spyClass = "";

  // TODO - ustawienie routingu z serwera, bo narazie to placeholder
  // CRUD 4 - Get profile of user
  function getUser<TResponse>(path: string): Promise<TResponse> {
    return fetch(`http://localhost:1337/profile/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data as TResponse);
  }

  const handleUserData = async () => {
    const { nickname } = useParams();
    if (nickname === "me") {
      const loggedUser = graczJa;
      const gracz = await getUser<User>(loggedUser.nickname).then(
        (then) => then
      );
      return gracz;
    }
    const gracz = await getUser<User>(nickname as string).then((data) => data);
    return gracz;
    // TODO - napraw te funkcje wyszukiwania znajomych bo jest straszna
    // const gracz = friends.find((friend) => friend.nickname === nickname);
    // useEffect useState to trzeba tak użyć :DD
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
