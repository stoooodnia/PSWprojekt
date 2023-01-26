import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to db");
  } catch (error) {
    logger.error("Error connecting to db", error);
    process.exit(1);
  }
}

export default connect;
