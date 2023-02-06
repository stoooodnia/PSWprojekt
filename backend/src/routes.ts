import { Express, Request, Response } from "express";

function routes(app: Express) {
  // healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //rejestracja
  app.post("/api/users", async (req: Request, res: Response) => {});

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
