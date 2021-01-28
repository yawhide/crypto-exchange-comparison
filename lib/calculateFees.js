const coinPriceCache = require("../coingecko");
const DATA = require("../public/javascripts/data").DATA;

function calculateFee(isBuy, exchangeInfo, method, amount, coin) {
  return (
    ((method.fee(amount) +
      exchangeInfo.tradingFee(amount) +
      exchangeInfo.realSpread(amount) +
      (isBuy
        ? exchangeInfo.withdrawFee[coin] * coinPriceCache[coin] || 0
        : 0)) /
      amount) *
    100
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

module.exports.calculateLowest3DepositsAndWithdraws = (amount) => {
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
};
