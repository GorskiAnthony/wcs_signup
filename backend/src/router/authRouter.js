const express = require("express");
// Doc : https://expressjs.com/en/guide/routing.html
const router = express.Router();

// controllers
const AuthController = require("../controllers/AuthController");

// http://localhost:5500/api/auth/register
router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

module.exports = router;
