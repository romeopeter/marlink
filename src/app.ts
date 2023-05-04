import connect from "./db.config";
import envConfig from "./env.config";
import ExpressConfig from "./express.config";
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
