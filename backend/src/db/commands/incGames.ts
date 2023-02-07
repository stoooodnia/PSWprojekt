import { driver } from "../../utils/connect";
import logger from "../../utils/logger";

export const incGames = (nickname: string) => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info("dostałem nick, zwiększam liczbę gier: " + nickname);
    session
      .run(
        "MATCH (user:User {nickname: $nickname}) SET user.gamesPlayed = user.gamesPlayed + 1 RETURN user.gamesPlayed",
        {
          nickname: nickname,
        }
      )
      .then((result) => {
        if (!result.records[0].get("user.gamesPlayed")) {
          reject({ error: "User not found" });
        } else {
          resolve({ message: "User successfully updated" });
        }
      })
      .catch((error) => reject({ error }));
  });
};
