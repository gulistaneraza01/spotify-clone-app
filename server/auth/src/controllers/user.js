import bcrypt from "bcrypt";
import User from "../models/User.js";
import TryCatch from "../utils/TryCatch.js";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../utils/constraints.js";

//login
export const register = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "missing field name, email or password" });
    return;
  }

  const userData = await User.findOne({ email });

  if (userData) {
    res.status(400).json({ message: "Already login" });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });

  const userObj = newUser.toObject();

  const token = jwt.sign(userObj, tokenSecret, { expiresIn: "7d" });
  res.json({ message: "User Register Successfully", token });
});

export const login = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "missing field name, email or password" });
    return;
  }

  const userInfo = await User.findOne({ email });

  if (!userInfo) {
    res.status(400).json({ message: "user does nor exists" });
    return;
  }

  const comparePassword = await bcrypt.compare(password, userInfo.password);
  if (comparePassword) {
    const userObj = userInfo.toObject();
    const token = jwt.sign(userObj, tokenSecret, { expiresIn: "7d" });
    res.json({ message: "successful login", token });
    return;
  } else {
    res.status(400).json({ message: "wrong password", userInfo, token });
    return;
  }
});

export const profile = TryCatch(async (req, res) => {
  const { _id } = req.user;
  const userData = await User.findById(_id);

  return res.json({ message: "userData", profile: userData });
});
