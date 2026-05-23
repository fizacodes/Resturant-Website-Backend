
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. cookie token
  let token = req.cookies?.token;

  // 2. fallback: Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

