import mongoose from "mongoose";
import { nanoid } from "nanoid";

const UrlSchema = new mongoose.Schema({
    originalUrl: {
      type: String,
      required: true,
    },
    shortenUrl: {
      type: String,
      default: () => nanoid(),
      unique: true,
      sparse: true,
    },
  });
  
  export default mongoose.model("Url", UrlSchema);