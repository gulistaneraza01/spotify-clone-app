import jwt from "jsonwebtoken";
import { tokenSecret } from "../utils/constraints.js";
import User from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "authorization header is missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodeToken = jwt.verify(token, tokenSecret);

    if (!decodeToken) {
      res.status(401).json({ message: "token does not match" });
      return;
    }

    const userId = decodeToken._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(403).json({
        message: "User Not found",
      });

      return;
    }

    console.log(user);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "login failer", error: error.message });
  }
};

export default isAuth;
