import { getProfile } from "./db/queries/getProfile";
import { createUser } from "./db/commands/createUser";
import { Express, Request, Response } from "express";
import { logIn } from "./db/queries/logIn";
import { deleteUser } from "./db/commands/deleteUser";
import logger from "./utils/logger";
import { changeEmail } from "./db/commands/changeEmail";
import { changeNickname } from "./db/commands/changeNickname";

function routes(app: Express) {
  // healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //rejestracja
  app.post("/api/users", async (req, res) => {
    const userProfile = req.body;
    try {
      const newUser = await createUser(userProfile);
      res.status(201).send({
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      res.status(409).send({
        message: "Failed to create user",
        error: error,
      });
    }
  });
  //logowanie
  app.post("/api/sessions", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await logIn(email, password);
      res.status(200).send({
        message: "User logged in successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(403).send(error);
    }
  });

  // pobieranie zalogowanego użytkownika
  app.post("/api/profile/me", async (req: Request, res: Response) => {
    const email = req.body.email;
    try {
      const user = await getProfile(email);
      res.status(200).send({
        message: "User found successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(403).send(error);
    }
  });

  // usuwanie profilu
  app.delete("/api/profile/:email", async (req: Request, res: Response) => {
    const email = req.params.email;
    logger.info(email);
    try {
      const deletedUser = await deleteUser(email);
      res.status(200).send({
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error: any) {
      res.status(409).send({
        message: "Failed to delete user",
        error: error,
      });
    }
  });
  // wylogowywanie
  app.delete("/api/sessions");

  // tworzenie gry
  app.get("/api/game");

  // pobieranie profilu
  app.get("/api/profile/:id", async (req: Request, res: Response) => {});

  // pobieranie statystyk
  app.get("/api/stats/:nickname");

  // pobieranie listy graczy bez wzorca
  app.get("/api/friends", async (req: Request, res: Response) => {
    console.log(req.body);
    const { nickname } = req.body;
    try {
      const users = await getProfile(nickname);
      return res
        .status(200)
        .send({ message: "Matching users found", data: users });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // pobieranie listy graczy ze wzorcem
  app.get("/api/friends/:nickname", async (req: Request, res: Response) => {});

  // zmiana maila
  app.put("/api/changeEmail", async (req: Request, res: Response) => {
    console.log(req.body);
    const { email, newEmail } = req.body;

    try {
      const user = await changeEmail(email, newEmail);
      const status = JSON.stringify(user.data);
      if (status === "null") {
        return res.status(409).send({ error: "Email already taken" });
      }

      return res.status(200).send({ message: "Email changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // zmiana nicku
  app.put("/api/changeNickname", async (req: Request, res: Response) => {
    const { nickname, newNickname } = req.body;

    try {
      const user = await changeNickname(nickname, newNickname);
      const status = JSON.stringify(user.data);
      if (status === "null") {
        return res.status(409).send({ error: "Nickname already taken" });
      }

      return res.status(200).send({ message: "Nickname changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
  // zmiana hasła
  app.put("/api/changePassword", async (req: Request, res: Response) => {});
}

export default routes;
