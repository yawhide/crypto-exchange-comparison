var express = require("express");
var router = express.Router();
const coinPriceCache = require("../coingecko");
const DATA = require("../public/javascripts/data").DATA;

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

function calculateFee(isBuy, exchangeInfo, method, amount, coin) {
  return (
    method.fee(amount) +
    exchangeInfo.tradingFee(amount) +
    exchangeInfo.realSpread(amount) +
    (isBuy ? exchangeInfo.withdrawFee[coin] * coinPriceCache[coin] || 0 : 0)
  );
}

function calculateLowestFeeMethod(isBuy, exchangeInfo, methods, amount) {
  return methods
    .filter((method) => amount >= method.min && amount <= method.max)
    .reduce((accumulator, currentMethod) => {
      fee = calculateFee(isBuy, exchangeInfo, currentMethod, amount, "BTC");
      if (Object.keys(accumulator).length === 0 || accumulator.fee > fee) {
        accumulator = {
          fee: +fee.toFixed(2),
          exchangeInfo,
          method: currentMethod,
        };
      }
      return accumulator;
    }, {});
}

function calculateLowest3DepositsAndWithdraws(amount) {
  let deposits = [];
  let withdraws = [];
  Object.keys(DATA).forEach((exchangeName) => {
    const exchangeInfo = DATA[exchangeName];
    const deposit = calculateLowestFeeMethod(
      true,
      exchangeInfo,
      exchangeInfo.depositMethods,
      amount
    );
    const withdraw = calculateLowestFeeMethod(
      false,
      exchangeInfo,
      exchangeInfo.withdrawMethods,
      amount
    );
    if (Object.keys(deposit).length !== 0) deposits.push(deposit);
    if (Object.keys(withdraw).length !== 0) withdraws.push(withdraw);
  });
  return {
    deposits: deposits.sort((a, b) => a.fee - b.fee).slice(0, 3),
    withdraws: withdraws.sort((a, b) => a.fee - b.fee).slice(0, 3),
  };
}

module.exports = router;
