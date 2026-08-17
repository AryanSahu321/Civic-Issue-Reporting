import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "civic-secure-jwt-secret-key";

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({
        status: "error",
        message: "Authorization token missing or malformed.",
      });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: "error", message: "Invalid or expired token." });
  }
};

export const requireRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Access denied. Insufficient permissions for this route.",
      });
    }
    next();
  };
};
