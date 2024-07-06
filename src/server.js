const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.disable("x-powered-by");

// middleware to extract token from authorization header
function extractToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    req.token = token;
  } else {
    req.token = null;
  }
  next();
}

app.use(extractToken);

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./router");

app.use("/", router);

module.exports = app;
