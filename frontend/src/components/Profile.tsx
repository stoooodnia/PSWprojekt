import React, { useMemo } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { randomSpy } from "../utils/randomSpy";
import { gracz } from "../utils/samples";

const Profile = () => {
  let spyClass = "";

  const handleUserData = () => {
    return gracz;
  };

  useMemo(() => {
    spyClass = randomSpy();
    handleUserData();
  }, []);

  return (
    <div className="flex flex-row h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div id="right">
        <NavBar />
        <div id="main">
          <div className="flex justify-around">
            <FontAwesomeIcon className={spyClass} icon={faUserSecret} />
            <div>
              <h1 className="text-7xl">{gracz.nickname}</h1>
              <h2 className="text-5xl">{gracz.email}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
