import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import lodash from "lodash";

export const changeNickname = (
  nickname: string,
  newNickname: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const session = driver.session();
    logger.info(nickname + " " + newNickname);
    session
      .run(
        "MATCH (user:User) WHERE user.nickname = $newNickname RETURN count(user)",
        {
          newNickname: newNickname,
        }
      )
      .then((countResult: any) => {
        if (countResult.records[0].get("count(user)").low > 0) {
          session.close();
          resolve({
            status: "success",
            message: "Nickname already exists",
            data: null,
          });
        } else {
          session
            .run(
              "MATCH (user:User) WHERE user.nickname = $nickname SET user.nickname = $newNickname RETURN user",
              {
                nickname: nickname,
                newNickname: newNickname,
              }
            )
            .then((result: any) => {
              logger.info("nickname zmieniony");
              session.close();
              resolve({
                status: "success",
                message: "Nickname changed successfully",
                data: lodash.omit(
                  result.records[0].get("user").properties,
                  "password"
                ),
                success: true,
              });
            })
            .catch((error: any) => {
              logger.error("changeNickname", error);
              reject({
                status: "error",
                message: "An error occured, please try again later",
              });
            });
        }
      })
      .catch((error: any) => {
        logger.error("changeNickname", error);
        reject({
          status: "error",
          message: "An error occured, please try again later",
        });
      });
  });
};
