import { driver } from "../../utils/connect";
import logger from "../../utils/logger";
import csv from "csv-parser";
import fs from "fs";

export const importUsers = (file: any) => {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      const session = driver.session();

      session
        .run(
          `CALL apoc.merge.nodeUnique(
            "User", 
            "email", 
            $email, 
            {email: $email, nickname: $nickname, password: $password}
          )`,
          {
            email: data.email,
            nickname: data.nickname,
            password: data.password,
          }
        )
        .then(() => {
          console.log(`Added user with email ${data.email}`);
          session.close();
        })
        .catch((error) => {
          console.log(error);
          session.close();
        });
    });
};
