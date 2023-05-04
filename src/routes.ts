import { Application, Request, Response } from "express";
import { nanoid } from "nanoid";
import urlModel from "./models/shortenUrl.model";

export default function routes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res
      .status(200)
      .send("Welcome to the yet another but spectacular URL shortening SaaS");
  });

  // Shorten Url
  app.post("/shorten", async (req: Request, res: Response) => {
    const originalUrl = req.body.originalUrl;
    const shortenUrl = nanoid();

    const url = new urlModel({ originalUrl, shortenUrl });

    try {
      // Save to DB
      url.save();
      res.status(202).json({ originalUrl, shortenUrl });
    } catch (e) {
      console.log(e);

      res.status(500).json({ message: "internal server error" });
    }
  });

  // Redirect to original URl
  app.get("/:shortenUrl", async (req: Request, res: Response) => {
    const shortenUrl = req.params.shortenUrl;

    try {
      const url = await urlModel.findOne({ shortenUrl });

      if (!url) {
        res
          .status(404)
          .json({
            statusCode: 404,
            statusText: "Resource not found",
            message: "URL not found",
          });
      } else {
        res.redirect(302, url.originalUrl);
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  });
}
