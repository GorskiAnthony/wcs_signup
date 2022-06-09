const express = require("express");
const app = express();
// J'appel mon router concernant l'authentification
const authRouter = require("./router/authRouter");

// pour transformer les données en json
app.use(express.json());

app.use("/api/auth", authRouter);

module.exports = app;
