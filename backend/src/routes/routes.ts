import { createUserSchema } from "../schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controler";
import requireUser from "../middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createUserSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
}

export default routes;
