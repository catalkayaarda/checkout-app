"use strict";

const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const router = express.Router();

console.log(`Paypango Checkout server http://localhost:${process.env.PORT} listening`);

app.set("Config", process.env);

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ type: "application/json", limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));

app.all("/api/*", require("./routes/api"));
// Health Check Endpoint
router.get('/', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  }

  console.log(data)

  res.status(200).send(data);
});
app.use("/healthcheck", router)
// /Health Check Endpoint

app.use(express.static(path.join(__dirname, process.env.STATIC_PATH)));
app.use("/*", express.static(path.join(__dirname, process.env.STATIC_PATH)));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message, code: err.code } });
});

module.exports = app;
