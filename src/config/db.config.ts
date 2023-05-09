import mongoose from "mongoose";
import envConfig from "./env.config";

const { DB_CONNECTION_LINK } = envConfig();

export default function connect() {
  mongoose
    .connect(DB_CONNECTION_LINK ? DB_CONNECTION_LINK : "")
    .then(() => console.log("MongoDB connected"))
    .catch((e) => {
      console.log("Could not connect to DB");
      console.error(e);

      // Exit connection and indcate error
      process.exit(1);
    });
}
