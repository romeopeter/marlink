import { Application } from "express";

// Controllers
import {
  indexController,
  shortenUrlController,
  redirectShortenedUrlController,
} from "./controllers/url.controller";

export default function routes(app: Application) {
  app.get("/", indexController);

  // Shorten Url
  app.post("/marlink/shortenurl", shortenUrlController);

  // Redirect to original URl
  app.get("/:shortenedUrlParam", redirectShortenedUrlController);
}
