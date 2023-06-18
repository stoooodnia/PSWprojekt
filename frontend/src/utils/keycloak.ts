import Keycloak from "keycloak-js";

const keycloakConfig = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "myrealm",
  clientId: "myapp",
});

export default keycloakConfig;
