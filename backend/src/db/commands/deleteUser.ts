import { driver } from "../../utils/connect";
import logger from "../../utils/logger";

export const deleteUser = (nickname: string) => {
  return new Promise((resolve, reject) => {
    const session = driver.session();

    session
      .run(
        "MATCH (user:User {nickname: $nickname}) DELETE user RETURN COUNT(user)",
        {
          nickname: nickname,
        }
      )
      .then((result) => {
        if (!result.records[0].get("COUNT(user)")) {
          reject({ error: "User not found" });
        } else {
          resolve({ message: "User successfully deleted" });
        }
      })
      .catch((error) => reject({ error }));
  });
};
