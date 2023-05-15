import dotenv from "dotenv";

export default function envConfig() {

  if (process.env.NODE_ENV !== "production") dotenv.config();

  return {
    PORT: process.env.PORT || 500,
    DB_CONNECTION_LINK: process.env.DB_CONNECTION_LINK
  }
}