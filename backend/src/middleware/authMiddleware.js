require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.user_wcs;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not logged in" });
    }
  }
};

module.exports = authMiddleware;
