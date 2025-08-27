import express from "express";
import user from "./src/routes/user.js";
import connectDB from "./src/configs/connectDB.js";
import cors from "cors";

const app = express();

//Port
const port = process.env.PORT || 3000;

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/api/v1", user);

connectDB();
//Server Listening
app.listen(port, () => {
  console.log(`🚀Server Listening On PORT: ${port}`);
});
