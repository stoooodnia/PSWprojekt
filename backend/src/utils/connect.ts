import neo4j from "neo4j-driver";
import config from "config";
import logger from "./logger";

const dbUri = config.get<string>("NEO4J_URI");
const dbUser = config.get<string>("NEO4J_USERNAME");
const dbPass = config.get<string>("NEO4J_PASSWORD");

export const driver = neo4j.driver(dbUri, neo4j.auth.basic(dbUser, dbPass));

async function connect() {
  try {
    await driver.getServerInfo();
    logger.info("NEO4J database connected");
  } catch (error) {
    logger.error(`Something went wrong ${error}`);
  }
}

export default connect;
