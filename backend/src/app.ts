import express from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import cors from "cors";

const port = config.get<number>("port");
const app = express();

// const keycloak = require("../config/keycloak-config").initKeycloak();
// app.use(keycloak.middleware());

app.use(express.json());

app.use(cors());

// app.options("*", cors());

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
