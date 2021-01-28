var express = require("express");
var router = express.Router();
const coinPriceCache = require("../coingecko");
const calculateLowest3DepositsAndWithdraws = require("../lib/calculateFees")
  .calculateLowest3DepositsAndWithdraws;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    tiers: [100, 500, 1000, 5000, 15000].map((i) => ({
      amount: i,
      ...calculateLowest3DepositsAndWithdraws(i),
    })),
  });
});

router.get("/coingecko-cache.json", function (req, res, next) {
  res.json(coinPriceCache);
});

router.get("/calculate-fees", function (req, res, next) {
  res.render("calculate-fees");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

module.exports = router;
