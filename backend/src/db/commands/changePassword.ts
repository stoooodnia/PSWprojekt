import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const changePassword = (
  nickname: string,
  newPassword: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info("zaczynam zmiane hasła" + nickname + " " + newPassword);

    session
      .run(
        "MATCH (user:User) WHERE user.nickname = $nickname SET user.password = $newPassword RETURN user",
        {
          nickname: nickname,
          newPassword: newPassword,
        }
      )
      .then((result: any) => {
        logger.info("hasło zmienione");
        session.close();
        resolve({
          status: "success",
          message: "Password changed successfully",
          data: lodash.omit(
            result.records[0].get("user").properties,
            "password"
          ),
        });
      })
      .catch((error: any) => {
        logger.error("changePassword", error);
        reject({
          status: "error",
          message: "An error occured, please try again later",
        });
      });
  });
};
