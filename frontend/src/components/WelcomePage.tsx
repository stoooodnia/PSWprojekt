import React, { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  let username = "";

  if (keycloak.authenticated) {
    if (keycloak.tokenParsed) {
      const username = keycloak.tokenParsed.preferred_username;
      alert(username);
      // CRUD 1 - POST - Register
      fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: username,
          admin: keycloak.hasRealmRole("APP-ADMIN"),
        }),
      }).then((response) => {
        navigate("/play");
      });
    }
  }

  const submitLogin = () => {
    // CRUD 2 - POST - Login
    fetch("http://localhost:1337/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: username,
      }),
    });
  };

  return (
    <div className="flex flex-row flex-end h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className="flex flex-col flex-end justify-center items-center h-full w-1/2 gap-2">
        <h1 className="text-7xl h-1/4">TAJNIACY</h1>
        <div className="w-full">
          <button
            type="submit"
            className=" w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow"
            onClick={() => {
              keycloak.login();
            }}
          >
            zaloguj
          </button>
          <button
            type="submit"
            className=" w-32 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded shadow"
            onClick={() => {
              keycloak.register();
            }}
          >
            zarejestruj
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
