import { getProfile } from "./db/queries/getProfile";
import { createUser } from "./db/commands/createUser";
import { Express, Request, Response } from "express";
import { logIn } from "./db/queries/logIn";
import { deleteUser } from "./db/commands/deleteUser";
import logger from "./utils/logger";
import { changeEmail } from "./db/commands/changeEmail";
import { changeNickname } from "./db/commands/changeNickname";
import { changePassword } from "./db/commands/changePassword";
import { getStats } from "./db/queries/getStats";
import { getUsers } from "./db/queries/getUsers";

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
  app.get("/api/profile/:nickname", async (req: Request, res: Response) => {
    const nickname = req.params.nickname;
    try {
      const user = await getProfile(nickname);
      res.status(200).send({
        message: "User found successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(403).send(error);
    }
  });

  // pobieranie statystyk
  app.get("/api/stats/:nickname", async (req: Request, res: Response) => {
    console.log(req.body);
    const nickname = req.params.nickname;
    try {
      const user = await getStats(nickname);
      logger.info("w endpointcie dostałem: " + user);
      return res
        .status(200)
        .send({ message: "User found successfully", data: user });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // pobieranie listy graczy bez wzorca
  app.get("/api/friends", async (req: Request, res: Response) => {
    const nickname = "";
    try {
      const users = await getUsers(nickname);
      return res
        .status(200)
        .send({ message: "Matching users found", data: users });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // pobieranie listy graczy ze wzorcem
  app.get("/api/friends/:searchTerm", async (req: Request, res: Response) => {
    const pattern = req.params.searchTerm;
    try {
      const users = await getUsers(pattern);
      return res
        .status(200)
        .send({ message: "Matching users found", data: users });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

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
  app.put("/api/changePassword", async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;
    try {
      const user = await changePassword(email, newPassword);
      return res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
}

export default routes;
