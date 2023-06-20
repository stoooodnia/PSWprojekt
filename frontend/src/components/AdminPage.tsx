import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import NavBar from "./NavBar";

const AdminPage = () => {
  const { keycloak } = useKeycloak();
  const username = keycloak?.idTokenParsed?.preferred_username;
  const roles = keycloak?.realmAccess?.roles.map((role) => role + ",  ");

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
          <h2>Panel Administratora</h2>
          <p>Witaj, {username}!</p>
          <p>Twoje role: {roles}</p>
          <p>Ta sekcja jest placeholderem dla panelu administratora.</p>
          <p>work in progress</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
