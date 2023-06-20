import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const AdminPage = () => {
  const { keycloak } = useKeycloak();
  const username = keycloak?.idTokenParsed?.preferred_username;
  const roles = keycloak?.realmAccess?.roles.map((role) => role + ",  ");

  return (
    <div>
      <h2>Panel Administratora</h2>
      <p>Witaj, {username}!</p>
      <p>Twoja rola: {roles}</p>
      <p>Ta sekcja jest placeholderem dla panelu administratora.</p>
      <p>work in progress</p>
    </div>
  );
};

export default AdminPage;
