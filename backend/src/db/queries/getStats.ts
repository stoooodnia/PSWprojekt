import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const getStats = (nickname: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info("pobieram dane dla: " + nickname);

    session
      .run("MATCH (user:User {nickname: $nickname}) RETURN user", {
        nickname: nickname,
      })
      .then((result) => {
        logger.debug("znalazłem " + result);
        session.close();
        resolve({
          status: "success",
          data: lodash.omit(
            result.records[0].get("user").properties,
            "password",
            "nickname",
            "admin"
          ),
        });
      })
      .catch((error) => {
        logger.error("getProfile", error);
        reject({ status: "error", message: "An error occured" });
      });
  });
};
