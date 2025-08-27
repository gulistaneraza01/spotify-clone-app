import express from "express";
import { login, register, profile } from "../controllers/user.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/login", login);
router.get("/user/me", isAuth, profile);

export default router;
