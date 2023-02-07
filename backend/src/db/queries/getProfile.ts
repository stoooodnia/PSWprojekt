import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const getProfile = (nickname: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info("dostałem nick, wyświetlam profil: " + nickname);

    session
      .run("MATCH (user:User {nickname: $nickname}) RETURN user", {
        nickname: nickname,
      })
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
