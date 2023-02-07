import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const getUsers = (pattern?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(pattern);
    if (pattern == null) {
      pattern = ".*";
    }
    session
      .run(
        "MATCH (user:User) WHERE user.nickname =~ $pattern RETURN user ORDER BY user.nickname LIMIT 5",
        {
          pattern: pattern,
        }
      )
      .then((result) => {
        logger.info(result);
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
        logger.error("getUsers", error);
        reject({ status: "error", message: "An error occured" });
      });
  });
};
