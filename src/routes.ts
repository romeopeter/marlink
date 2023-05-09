import { Application } from "express";

// Controllers
import {
  indexController,
  shortenUrlController,
  redirectShortenedUrlController,
  allShortenedUrlController,
  deleteShortenedUrlController
} from "./controllers/url.controller";

export default function routes(app: Application) {
  app.get("/", indexController);

  // Shorten URL
  app.post("/marlink/shortenurl", shortenUrlController);

  // Redirect to original URl
  app.get("/:shortenedUrlParam", redirectShortenedUrlController);

  // Get all shortened/truncated URLs
  app.get("/marlink/allurls", allShortenedUrlController)

  // Delete shortened/truncated URL
  app.get("/marlink/deleteUrl", deleteShortenedUrlController)
}
