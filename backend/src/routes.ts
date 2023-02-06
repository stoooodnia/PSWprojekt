import { createUser } from "./db/commands/createUser";
import { Express, Request, Response } from "express";

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
  app.post("/api/sessions");

  // pobieranie zalogowanego użytkownika
  app.post("/api/profile/me", async (req: Request, res: Response) => {});
  // pobieranie sesji
  app.get("/api/sessions");

  // wylogowywanie
  app.delete("/api/sessions");

  // tworzenie gry
  app.get("/api/game");

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
