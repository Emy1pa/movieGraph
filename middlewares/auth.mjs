import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Access Denied, no token was provided" });
  }
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "You are not allowed to this action",
      });
    }
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Only admin can access this",
      });
    }
  });
}

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
