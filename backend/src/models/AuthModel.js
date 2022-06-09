const connection = require("../services/connection");

class AuthModel {
  // Ici, je créer via la function create un nouvel utilisateur
  static async create(data) {
    const { email, password } = data;
    const result = await connection
      .promise()
      .query(`INSERT INTO users (email, password) VALUES (?, ?)`, [
        email,
        password,
      ]);
    return result;
  }

  /**
   * @description Ici, je récupère un utilisateur via son email
   * @param email
   * @returns {Promise<*>}
   */
  static async getUserByEmail(email) {
    const result = await connection
      .promise()
      .query(`SELECT * FROM users WHERE email = ?`, [email]);
    return result[0];
  }
}

module.exports = AuthModel;
