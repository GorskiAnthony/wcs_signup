const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// J'appel mon router concernant l'authentification
const authRouter = require("./router/authRouter");

app.use(cookieParser());
// pour transformer les données en json
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

module.exports = app;
