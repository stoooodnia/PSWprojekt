import logger from "../src/utils/logger";

const session = require("express-session");
const Keycloak = require("keycloak-connect");

let _keycloak: any;

var keycloakConfig = {
  clientId: "express-api",
  bearerOnly: true,
  serverUrl: "http://localhost:8080/",
  realm: "BAW-auth",
  credentials: {
    secret: "62c99f7c-da55-48fb-ae4e-a27f132546b7",
  },
};

function initKeycloak() {
  if (_keycloak) {
    logger.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    logger.info("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    logger.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
