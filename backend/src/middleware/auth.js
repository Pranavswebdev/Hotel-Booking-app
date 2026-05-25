import { verifyToken } from "../utils/token.js";
import { ApiError } from "./error.js";
import { User } from "../models/User.js";

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new ApiError(401, "Authentication required");

    const payload = verifyToken(token);
    const user = await User.findById(payload.sub);
    if (!user) throw new ApiError(401, "User no longer exists");

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return next(new ApiError(401, "Invalid or expired token"));
    }
    next(err);
  }
}
