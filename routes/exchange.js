const express = require("express");
const router = express.Router();

const DATA = require("../public/javascripts/data").DATA;

/* GET home page. */
router.get("/:exchange", function (req, res, next) {
  const exchangeName = req.params.exchange;
  res.render(
    "exchange",
    Object.assign({}, DATA[exchangeName], {
      coins: Object.keys(DATA[exchangeName].coins).join(", "),
      fiatFundingOptions: DATA[exchangeName].depositMethods
        .map((method) => method.type)
        .join(", "),
      fiatWithdrawalOptions: DATA[exchangeName].withdrawMethods
        .map((method) => method.type)
        .join(", "),
    })
  );
});

router.get("/compare/:exchanges", (req, res, next) => {
  const { baseExchangeName, compareExchangeName } = req.params.exchanges.split(
    ".."
  );
  res.render("exchange-compare", { baseExchangeName, compareExchangeName });
});

module.exports = router;
