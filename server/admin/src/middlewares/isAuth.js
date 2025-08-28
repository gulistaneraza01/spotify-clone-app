import axios from "axios";
import { authServiceURL } from "../utils/constraints.js";

async function isAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "authorization header is missing" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const { data } = await axios.get(`${authServiceURL}/api/v1/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    req.user = data.profile;
    next();
  } catch (error) {
    res.status(401).json({ message: "please login" });
  }
}

export default isAuth;
