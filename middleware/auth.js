import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unauthenticated.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "63f59322de98eb0187b77b2f";

    req.user = { userId: payload.userId, testUser };
    return next();
  } catch (err) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
