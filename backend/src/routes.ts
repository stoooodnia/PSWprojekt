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
import { findUsers } from "./service/findUsers.service";
import { findUsersRegex } from "./service/findUsersRegex.service";
import { getUserById } from "./service/getUserById.service";
import { getUserByEmail } from "./service/getUserByEmail.service";

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

  // pobieranie zalogowanego użytkownika
  app.post("/api/profile/me", async (req: Request, res: Response) => {
    try {
      const user = await getUserByEmail(req.body.email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  });
  // pobieranie sesji
  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  // wylogowywanie
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  // tworzenie gry
  app.get("/api/game");

  // pobieranie profilu
  app.get("/api/profile/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  });

  // pobieranie statystyk
  app.get("/api/stats/:nickname");

  // pobieranie listy graczy bez wzorca
  app.get("/api/friends", async (req: Request, res: Response) => {
    try {
      const users = await findUsers();
      if (!users) {
        return res.status(404).json({ error: "Users not found" });
      }

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  });

  // pobieranie listy graczy ze wzorcem
  app.get("/api/friends/:nickname", async (req: Request, res: Response) => {
    const pattern = req.params.nickname;
    try {
      const users = await findUsersRegex(pattern);
      if (!users) {
        return res.status(404).json({ error: "Users not found" });
      }

      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  });

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
