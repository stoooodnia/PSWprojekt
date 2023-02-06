import { getProfile } from "./db/queries/getProfile";
import { createUser } from "./db/commands/createUser";
import { Express, Request, Response } from "express";
import { logIn } from "./db/queries/logIn";
import { deleteUser } from "./db/commands/deleteUser";
import logger from "./utils/logger";

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

  // wylogowywanie
  app.delete("/api/sessions");

  // tworzenie gry
  app.get("/api/game");

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

  // pobieranie profilu
  app.get("/api/profile/:id", async (req: Request, res: Response) => {});

  // pobieranie statystyk
  app.get("/api/stats/:nickname");

  // pobieranie listy graczy bez wzorca
  app.get("/api/friends", async (req: Request, res: Response) => {});

  // pobieranie listy graczy ze wzorcem
  app.get("/api/friends/:nickname", async (req: Request, res: Response) => {});

  // zmiana maila
  app.put("/api/changeEmail", async (req: Request, res: Response) => {});

  // zmiana nicku
  app.put("/api/changeNickname", async (req: Request, res: Response) => {});
  // zmiana hasła
  app.put("/api/changePassword", async (req: Request, res: Response) => {});
}

export default routes;

// app.put("/api/changeEmail", async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { id, newemail } = req.body;

//   try {
//     const user = await changeEmail(id, newemail);
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     return res.status(200).send({ message: "Email changed successfully" });
//   } catch (error) {
//     return res.status(500).send({ error: "Server error" });
//   }
// });
