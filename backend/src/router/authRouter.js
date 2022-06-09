const express = require("express");
// Doc : https://expressjs.com/en/guide/routing.html
const router = express.Router();

// middleware
const authMiddleware = require("../middleware/authMiddleware");
// controllers
const AuthController = require("../controllers/AuthController");

// http://localhost:5500/api/auth/register
router.post("/register", AuthController.register);

// http://localhost:5500/api/auth/login
router.post("/login", AuthController.login);

// http://localhost:5500/api/auth/articles
router.get("/articles", authMiddleware, AuthController.articles);

module.exports = router;
