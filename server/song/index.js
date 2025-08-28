import express from "express";
import client from "./src/routes/client.js";
import redis from "./src/configs/redis.js";

const app = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", client);

app.listen(port, () => {
  console.log(`Server Listening On PORT: ${port}`);
});
