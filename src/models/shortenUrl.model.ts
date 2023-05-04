import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl: {
      type: String,
      required: true,
    },
    shortenUrl: {
      type: String,
      required: true,
    },
  });
  
  export default mongoose.model("Url", UrlSchema);