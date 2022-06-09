require("dotenv").config();

const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/static
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const getMail = await AuthModel.getUserByEmail(email);

      /**
       * Si l'email existe déjà, on renvoie une erreur
       */
      if (getMail[0].length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Email already exist",
        });
      }

      // hash le mot de passe
      const hash = await bcrypt.hash(password, 10);

      // je passe le MDP hashé dans le model
      const user = await AuthModel.create({ email, password: hash });
      res.status(201).json({
        message: "User created",
        user,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthModel.getUserByEmail(email);
      if (user.length === 0) {
        return res.status(400).json({
          status: 400,
          message: "User not found",
        });
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          user[0].password
        );
        if (!isPasswordValid) {
          return res.status(400).json({
            status: 400,
            message: "Password is incorrect",
          });
        }

        // je créé un token
        const token = jwt.sign(
          {
            id: user[0].id,
            email: user[0].email,
          },
          process.env.SECRET_JWT,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("user_wcs", token).json({
          message: "User logged",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  static async articles(req, res) {
    res.json({ ...req.user });
  }
}

module.exports = AuthController;
