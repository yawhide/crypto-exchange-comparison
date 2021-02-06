const coingecko = require("./lib/coingecko");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const fs = require("fs");
const hbs = require("hbs");
const logger = require("morgan");
const path = require("path");

const indexRouter = require("./routes/index");
const exchangeRouter = require("./routes/exchange");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", (err) => {});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const routeMapping = {
  "/": "home",
  "/calculate-fees": "calculateFees",
  "/about": "about",
};

app.use((req, res, next) => {
  res.locals.coingeckoPriceLastUpdated = coingecko.getCoinPriceCacheLastUpdatedAt();
  res.locals.active = { [routeMapping[req.path]]: true };
  next();
});

app.use("/", indexRouter);
app.use("/exchange", exchangeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
