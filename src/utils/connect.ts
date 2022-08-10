import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info("Database Connected");
  } catch (err) {
    log.error("Could not connect to Database");
    process.exit(1);
  }
}

export default connect;
