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
import { changePassword } from "./service/changePassword.service";
import { changeNickname } from "./service/changeNickname.service";
import { changeEmail } from "./service/changeEmail.service";

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

  // pobieranie listy graczy bez wzorca
  app.get("/api/friends");

  // pobieranie listy graczy ze wzorcem
  app.get("/api/friends/:nickname");

  // zmiana maila
  app.put("/api/changeEmail", async (req: Request, res: Response) => {
    const { userId, newEmail } = req.body;

    try {
      const user = await changeEmail(req, userId, newEmail);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      return res.status(200).send({ message: "Email changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // zmiana nicku
  app.put("/api/changeNickname", async (req: Request, res: Response) => {
    const { email, newNickname } = req.body;

    try {
      const user = await changeNickname(req, email, newNickname);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      return res.status(200).send({ message: "Nickname changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // zmiana hasła
  app.put("/api/changePassword", async (req: Request, res: Response) => {
    {
      const { email, newPassword } = req.body;

      try {
        const user = await changePassword(req, email, newPassword);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }

        return res
          .status(200)
          .send({ message: "Password changed successfully" });
      } catch (error) {
        return res.status(500).send({ error: "Server error" });
      }
    }
  });
}

export default routes;
