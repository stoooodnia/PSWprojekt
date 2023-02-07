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
import { getAllUsers } from "./db/queries/getAllUsers";

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
  app.delete("/api/profile/:nickname", async (req: Request, res: Response) => {
    const nickname = req.params.nickname;
    logger.info(nickname);
    try {
      const deletedUser = await deleteUser(nickname);
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
  app.post("/api/friends", async (req: Request, res: Response) => {
    const pattern = "";
    const nickname = req.body.nickname;
    try {
      const users = await getUsers(pattern, nickname);
      return res
        .status(200)
        .send({ message: "Matching users found", data: users });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });

  // pobieranie listy graczy ze wzorcem
  app.post("/api/friends/:searchTerm", async (req: Request, res: Response) => {
    const pattern = req.params.searchTerm;
    const nickname = req.body.nickname;
    try {
      const users = await getUsers(pattern, nickname);
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
    const { nickname, newEmail } = req.body;

    try {
      const user = await changeEmail(nickname, newEmail);
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
    const { nickname, newPassword } = req.body;
    try {
      const user = await changePassword(nickname, newPassword);
      return res.status(200).send({ message: "Password changed successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
  // pobieranie wszystkich użytwników
  app.get("/api/getAllUsers", async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      let csv = "";
      csv += Object.keys(users[0]).join(",") + "\n";
      users.forEach((user: { [s: string]: unknown } | ArrayLike<unknown>) => {
        csv += Object.values(user).join(",") + "\n";
      });
      return res
        .setHeader("Content-disposition", "attachment; filename=users.csv")
        .set("Content-Type", "text/csv")
        .status(200)
        .send(csv);
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
}

export default routes;
