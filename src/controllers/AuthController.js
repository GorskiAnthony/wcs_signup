const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes/static
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const getMail = await UserModel.getUserByEmail(email);

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
      const user = await UserModel.create({ email, password: hash });
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
      const user = await UserModel.getUserByEmail(email);

      /**
       * Si l'email n'existe pas, on renvoie une erreur
       */
      if (user[0].length === 0) {
        return res.status(400).json({
          status: 400,
          message: "Email not found",
        });
      }

      // compare le mot de passe avec le hash
      const compare = await bcrypt.compare(password, user[0][0].password);

      /**
       * Si le mot de passe ne correspond pas, on renvoie une erreur
       */
      if (!compare) {
        return res.status(400).json({
          status: 400,
          message: "Password not correct",
        });
      }

      // si tout est ok, on renvoie un token
      const token = jwt.sign(
        { email: user[0][0].email },
        process.env.SECRET_JWT,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token).status(200).json({
        message: "User logged",
        token,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

module.exports = AuthController;
