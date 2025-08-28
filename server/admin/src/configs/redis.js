import { Redis } from "ioredis";
import { redisURL } from "../utils/constraints.js";

const redis = new Redis(redisURL, {
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  showFriendlyErrorStack: process.env.NODE_ENV === "development",
});

redis.on("connect", () => {
  console.log("✅Redis client connected");
});

redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export default redis;
