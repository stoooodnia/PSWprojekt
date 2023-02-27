import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import cors from "cors";
import basicAuth from "express-basic-auth";

const port = config.get<number>("port");
const app = express();

app.use(
  basicAuth({
    users: { admin: "supersecret" },
  })
);

app.use(express.json());

app.use(cors());

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
