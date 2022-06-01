const connection = require("../services/connection");

class UserModel {
  /**
   * @description Créer un nouvel utilisateur
   * @param data
   * @returns {Promise<*>}
   */
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
    return result;
  }

  /**
   * @description Ici, je récupère un utilisateur via son id
   * @param id
   * @returns {Promise<*>}
   */
  static async getAllUser() {
    const result = await connection.promise().query(`SELECT * FROM users;`);
    return result;
  }
}

module.exports = UserModel;
