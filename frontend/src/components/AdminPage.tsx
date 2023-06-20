import { useKeycloak } from "@react-keycloak/web";
import React from "react";

const AdminPage = () => {
  const { keycloak } = useKeycloak();
  const username = keycloak?.idTokenParsed?.preferred_username;
  const roles = keycloak?.realmAccess?.roles;

  return (
    <div>
      <h2>Panel Administratora</h2>
      <p>Witaj, {username}!</p>
      <p>Twoja rola: {roles}</p>
      <p>Ta sekcja jest placeholderem dla panelu administratora.</p>
      <p>
        Tutaj możesz wyświetlić dowolne komponenty lub treści związane z panelem
        administratora.
      </p>
    </div>
  );
};

export default AdminPage;
