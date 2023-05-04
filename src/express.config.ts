import express, { Application } from "express";

const ExpressConfig = (): Application => {
  const app = express();

  // Parse incomging request as JSON
  app.use(express.json());

  return app;
};

export default ExpressConfig;
