import { getProfile } from "./db/queries/getProfile";
import { createUser } from "./db/commands/createUser";
import { Express, Request, Response } from "express";
import logger from "./utils/logger";
import { getStats } from "./db/queries/getStats";
import { getUsers } from "./db/queries/getUsers";
import { getAllUsers } from "./db/queries/getAllUsers";
import { incGames } from "./db/commands/incGames";
import { sumGamesPlayed } from "./db/queries/sumGamesPlayed";

function routes(app: Express) {
  // healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // rejestracja (tworzenie profilu w bazie danych)
  app.post("/api/register", async (req, res) => {
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
  // inkrementacja rozegranych gier
  app.put("/api/incrementGames", async (req: Request, res: Response) => {
    const { nickname } = req.body;
    try {
      const user = await incGames(nickname);
      return res
        .status(200)
        .send({ message: "Games incremented successfully" });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
  // sumowanie rozegranych gier
  app.get("/api/sumGamesPlayed", async (req: Request, res: Response) => {
    try {
      const sum = await sumGamesPlayed();
      return res.status(200).send({ sum });
    } catch (error) {
      return res.status(500).send({ error: "Server error" });
    }
  });
}

export default routes;
