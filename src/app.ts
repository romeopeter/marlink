import connect from "./config/db.config";
import envConfig from "./config/env.config";
import ExpressConfig from "./config/express.config";
import routes from "./routes";

const app = ExpressConfig();
const { PORT } = envConfig();

app.listen(PORT, () => {
  console.log("App is running on http://localhost:" + PORT);

  // DB connection
  connect();

  // Url routes
  routes(app);
});
