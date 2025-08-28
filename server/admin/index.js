import express from "express";
import migrateDB from "./src/utils/migrateDB.js";
import admin from "./src/routes/admin.js";
import isAuth from "./src/middlewares/isAuth.js";

const app = express();

const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", isAuth, admin);

migrateDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀Server Listening On PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
