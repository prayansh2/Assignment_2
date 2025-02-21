const jsonwebtoken = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ success: false, message: "Access denied" });

  try {
    const decoded = jsonwebtoken.verify(token.replace("Bearer ", ""), "processenvJWT_SECRET");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
