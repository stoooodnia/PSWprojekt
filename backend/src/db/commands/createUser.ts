import { driver } from "../../utils/connect";
import { UserProfile } from "../../models/user.model";

export const createUserIfNotExists = (
  userProfile: UserProfile
): Promise<UserProfile> => {
  return new Promise((resolve, reject) => {
    // Create a new session using the driver
    const session = driver.session();

    // Use session.run() to attempt to match an existing user
    session
      .run("match (user:User) where user.email = {email} RETURN user", {
        email: userProfile.email,
      })
      .then((result: any) => {
        // if the records < 1 then create a new user
        if (result.records.length < 1) {
          // Use session.run() to create a new User node in the db
          session
            .run(
              "create (user:User { email: {email}, nickname: {nickname}, password: {password}, gamesPlayed: {gamesPlayed}})",
              {
                email: userProfile.email,
                firstName: userProfile.nickname,
                password: userProfile.password,
                gamesPlayed: 0,
              }
            )
            .then((result: any) => {
              session.close();
              resolve(userProfile);
            })
            .catch((error: any) => {
              // catch error and log
              console.log(
                "createUserIfNotExists - cypher create failed",
                error
              );
            });
        }
        // resolve the promise using the userProfile
        resolve(userProfile);
      })
      .catch((error: any) => {
        // catch error and log
        console.log("createUserIfNotExists", error);
      });
  });
};
