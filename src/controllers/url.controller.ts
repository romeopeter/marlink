import { Request, Response } from "express";
import { nanoid } from "nanoid";
import urlModel from "../models/url.model";

export function indexController(req: Request, res: Response) {
  res
    .status(200)
    .send("Welcome to the yet another but spectacular URL shortening SaaS");
}

// Shorten/truncate URL controller
export async function shortenUrlController(req: Request, res: Response) {
  const originalUrl = req.body.originalUrl;
  const customUrl = req.body.customUrl || nanoid();

  const url = new urlModel({ originalUrl, customUrl });

  try {
    // Save to DB
    await url.save();
    res.status(202).json({
      status: 202,
      statusText: "OK",
      data: { originalUrl, customUrl },
    });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: "internal server error" });
  }
}

// Redirect  shortened/truncated URL controller
export async function redirectShortenedUrlController(
  req: Request,
  res: Response
) {
  const shortenUrlParam = req.params.shortenedUrlParam;

  try {
    const url = await urlModel.findOne({ shortenUrlParam });

    if (!url) {
      res.status(404).json({
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
}

// Get all shortened/truncated URL controller
export async function allShortenedUrlController(req: Request, res: Response) {
  try {
    const allUrl = await urlModel.find();
    res.status(200).json({ status: 202, statusText: "OK", data: allUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}

// Delete shortened/truncated URl controller
export async function deleteShortenedUrlController(
  req: Request,
  res: Response
) {
  const shortenUrlIdParam = req.params.shortenUrlIdParam;

  try {
    const result = await urlModel.deleteOne({ shortenUrlIdParam });

    if (result.deletedCount === 0) {
      res.json(404).json({
        status: 404,
        statusText: "Resource not found",
        message: "URL not found",
      });
    } else {
      res.status(200).json({
        status: 200,
        statusText: "Resource deleted",
        message: "URL deleted successfully",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
}
