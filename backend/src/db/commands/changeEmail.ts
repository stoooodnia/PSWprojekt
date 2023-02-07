import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const changeEmail = (
  nickname: string,
  newEmail: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(nickname + " " + newEmail);
    session
      .run(
        "MATCH (user:User) WHERE user.email = $newEmail RETURN count(user)",
        {
          newEmail: newEmail,
        }
      )
      .then((countResult: any) => {
        if (countResult.records[0].get("count(user)").low > 0) {
          session.close();
          resolve({
            status: "success",
            message: "Email already exists",
            data: null,
          });
        } else {
          session
            .run(
              "MATCH (user:User) WHERE user.nickname = $nickname SET user.email = $newEmail RETURN user",
              {
                nickname: nickname,
                newEmail: newEmail,
              }
            )
            .then((result: any) => {
              logger.info("email zmieniony");
              session.close();
              resolve({
                status: "success",
                message: "Email changed successfully",
                data: lodash.omit(
                  result.records[0].get("user").properties,
                  "password"
                ),
                success: true,
              });
            })
            .catch((error: any) => {
              logger.error("changeEmail", error);
              reject({
                status: "error",
                message: "An error occured, please try again later",
              });
            });
        }
      })
      .catch((error: any) => {
        logger.error("changeEmail", error);
        reject({
          status: "error",
          message: "An error occured, please try again later",
        });
      });
  });
};
