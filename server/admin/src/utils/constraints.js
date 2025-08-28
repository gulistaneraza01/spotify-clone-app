import dotenv from "dotenv";
dotenv.config();

const postgresUri = process.env.POSTGRESQL_URI;
const authServiceURL = process.env.AUTH_SERVICE_URL;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

export {
  postgresUri,
  authServiceURL,
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryCloudName,
};
