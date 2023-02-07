import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const getUsers = (pattern?: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(pattern);
    if (pattern === "") {
      pattern = ".*";
    } else {
      pattern = ".*" + pattern + ".*";
    }
    session
      .run(
        "MATCH (user:User) WHERE user.nickname =~ $pattern RETURN user ORDER BY user.nickname LIMIT 5",
        {
          pattern: pattern,
        }
      )
      .then((result) => {
        session.close();
        const users = result.records.map((record) =>
          lodash.omit(record.get("user").properties, "password")
        );
        resolve({
          status: "success",
          data: users,
        });
      })
      .catch((error) => {
        logger.error("getUsers", error);
        reject({ status: "error", message: "An error occured" });
      });
  });
};
