import dotenv from "dotenv";
dotenv.config();

const postgresqlUri = process.env.POSTGRESQL_URI;
const redisURL = process.env.REDIS_URL;

export { postgresqlUri, redisURL };
