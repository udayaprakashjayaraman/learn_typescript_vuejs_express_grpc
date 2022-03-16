import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const dbUri = "mongodb://localhost:27017/rest-api" as string;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;