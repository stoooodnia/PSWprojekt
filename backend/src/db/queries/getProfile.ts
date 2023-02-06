import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const getProfile = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(email);

    session
      .run("MATCH (user:User {email: $email}) RETURN user", { email: email })
      .then((result) => {
        logger.debug(result);
        session.close();
        resolve({
          status: "success",
          data: lodash.omit(
            result.records[0].get("user").properties,
            "password"
          ),
        });
      })
      .catch((error) => {
        logger.error("getProfile", error);
        reject({ status: "error", message: "An error occured" });
      });
  });
};
