import { driver } from "../../utils/connect";
import { UserProfile } from "../../models/user.model";
import logger from "../../utils/logger";

export const createUser = (userProfile: UserProfile): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    // Create a new session using the driver
    const session = driver.session();

    logger.info(JSON.stringify(userProfile));
    // Use session.run() to attempt to match an existing user
    session
      .run("match (user:User) where user.nickname = $nickname RETURN user", {
        nickname: userProfile.nickname,
      })
      .then((result: any) => {
        // log the existing user
        logger.info("zarejestrowano użytkownika");
        // if the records < 1 then create a new user
        if (result.records.length < 1) {
          // Use session.run() to create a new User node in the db
          session
            .run(
              "create (user:User { email: $email, nickname: $nickname, password: $password, gamesPlayed: $gamesPlayed, admin: $admin})",
              {
                nickname: userProfile.nickname,
                gamesPlayed: 0,
                admin: userProfile.admin,
              }
            )
            .then((result: any) => {
              session.close();
              resolve(userProfile);
            })
            .catch((error: any) => {
              // catch error and log
              logger.error(
                "createUserIfNotExists - cypher create failed" + error
              );
            });
        }
        // if the records > 0 then reject the promise
        else {
          // check if the email or nickname already exists
          if (
            result.records[0].get("user").properties.nickname ===
            userProfile.nickname
          ) {
            reject({ message: "Nickname already exists", field: "nickname" });
          }
        }
        // resolve the promise using the userProfile
        resolve(userProfile);
      })
      .catch((error: any) => {
        // catch error and log
        logger.error("createUserIfNotExists", error);
      });
  });
};
