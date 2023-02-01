import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controler";
import requireUser from "./middleware/requireUser";
import { createSessionSchema } from "./schema/session.schema";

function routes(app: Express) {
  // healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //rejestracja
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  //logowanie
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  // pobieranie sesji
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  // wylogowywanie
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // tworzenie gry
  app.get("/api/game");

  // pobieranie profilu
  app.get("/api/profile/:nickname");

  // pobieranie statystyk
  app.get("/api/stats/:nickname");

  //

  //
}

export default routes;
