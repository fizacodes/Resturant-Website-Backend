
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,   // Cloud name from .env
  api_key: process.env.CLOUD_API_KEY,   // API key from .env
  api_secret: process.env.CLOUD_API_SECRET, // API secret from .env
  secure: true, // always use HTTPS
});

// Optional: log to check if variables are loaded correctly (remove in production)
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.warn("Cloudinary environment variables are missing!");
}

export default cloudinary;
