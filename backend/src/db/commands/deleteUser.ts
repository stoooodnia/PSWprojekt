import { driver } from "../../utils/connect";
import { UserProfile } from "../../models/user.model";
import logger from "../../utils/logger";

export const deleteUser = (email: string) => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(email);

    session
      .run("MATCH (user:User {email: $email}) DELETE user", { email: email })
      .then((result) => {
        logger.debug(result);
        if (!result.records.length) {
          reject({ error: "User not found" });
        } else {
          resolve({ message: "User successfully deleted" });
        }
      })
      .catch((error) => reject({ error }));
  });
};
