import { driver } from "../../utils/connect";
import { UserProfile } from "../../models/user.model";
import logger from "../../utils/logger";
import lodash from "lodash";

export const logIn = (email: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(email + " " + password);
    session
      .run(
        "MATCH (user:User) WHERE user.email = $email AND user.password = $password RETURN user",
        {
          email: email,
          password: password,
        }
      )
      .then((result: any) => {
        logger.info("zalogowano użytkownika");
        session.close();
        resolve({
          status: "success",
          data: lodash.omit(
            result.records[0].get("user").properties,
            "password"
          ),
        });
      })
      .catch((error: any) => {
        logger.error("login", error);
        reject({
          status: "error",
          message: "An error occured, please try again later",
        });
      });
  });
};
