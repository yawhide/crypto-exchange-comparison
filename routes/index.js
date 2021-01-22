var express = require("express");
var router = express.Router();
const coinPriceCache = require("../coingecko");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/coingecko-cache.json", function (req, res, next) {
  res.json(coinPriceCache);
});

router.get("/calculate-fees", function (req, res, next) {
  res.render("calculate-fees", { title: "Express" });
});

module.exports = router;
