import { driver } from "../../utils/connect";
import logger from "../../utils/logger";

export const getAllUsers = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info("pobieram wszystkich użytkowników");
    session
      .run("MATCH (user:User) RETURN user")
      .then((result) => {
        logger.debug("znalazłem " + result);
        session.close();
        const users = result.records.map(
          (record) => record.get("user").properties
        );
        resolve(users);
      })
      .catch((error) => {
        logger.error("getAllUsers", error);
        reject({ status: "error", message: "An error occured" });
      });
  });
};
