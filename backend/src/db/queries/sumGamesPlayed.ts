import { driver } from "../../utils/connect";
import logger from "../../utils/logger";

export const sumGamesPlayed = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    // Create a new session using the driver
    const session = driver.session();

    // Use session.run() and the apoc library to sum all gamesPlayed properties
    session
      .run("MATCH (user:User) RETURN apoc.agg.sum(user.gamesPlayed) AS total")
      .then((result: any) => {
        session.close();
        resolve(result.records[0].get("total").toNumber());
      })
      .catch((error: any) => {
        // catch error and log
        logger.error("sumGamesPlayed failed", error);
        reject(error);
      });
  });
};
