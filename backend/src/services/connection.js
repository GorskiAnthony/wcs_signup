require("dotenv").config();
// Me permet de créer une connexion avec la BDD
const { createConnection } = require("mysql2");

const connection = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = connection;
