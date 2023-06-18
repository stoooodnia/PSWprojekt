import Keycloak from "keycloak-js";

const keycloakConfig = new Keycloak({
  url: "http://localhost:8080/",
  realm: "BAW-auth",
  clientId: "REACT-SERVICE",
});

export default keycloakConfig;
