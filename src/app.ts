import ExpressConfig from "./express.config";

const app = ExpressConfig()
const port = process.env.port || 500;

app.listen(port, () => console.log("App is serving on port: ", port));