const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  console.log(token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
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
    const cleanUserId = req.user.id;
    const cleanParamId = req.params.id;
    console.log("User ID from token:", cleanUserId);
    console.log("User ID from params:", cleanParamId);
    console.log("User role:", req.user.role);

    if (cleanUserId === cleanParamId || req.user.role === "admin") {
      console.log("Authorization passed");
      next();
    } else {
      return res.status(403).json({
        message: "You are not allowed to perform this action",
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

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
