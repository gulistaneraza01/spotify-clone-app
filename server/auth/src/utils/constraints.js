import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;
const tokenSecret = process.env.TOKEN_SECRET;

export { mongoUri, tokenSecret };
