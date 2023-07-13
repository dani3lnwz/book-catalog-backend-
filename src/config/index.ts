import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGO_URL,
  database_password: process.env.DB_PASSWORD,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
};
