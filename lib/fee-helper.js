export function withdrawCryptoFee(
  withdrawFees,
  cryptocurrency,
  cryptocurrencyPrices,
  networkFees
) {
  const withdrawFee = withdrawFees[cryptocurrency];
  if (!withdrawFee) return 0;
  if (typeof withdrawFee !== "function")
    return withdrawFee * cryptocurrencyPrices[cryptocurrency];

  if (cryptocurrency === "ETH" || cryptocurrency === "BTC")
    return withdrawFee(cryptocurrencyPrices, networkFees);
  throw `unsupported cryptocurrency ${cryptocurrency} with function in withdraw crypto fee.`;
}

export function buyTotalFee(
  amount,
  cryptocurrency,
  cryptocurrencyPrices,
  networkFees,
  depositMethodFeeFn,
  tradingFeeFn,
  spreadFeeFn,
  withdrawFees
) {
  return (
    depositMethodFeeFn(amount) + // deposit fiat fee
    tradingFeeFn(amount) + // trading fee
    spreadFeeFn(amount) + // spread fee
    withdrawCryptoFee(
      // withdraw crypto fee
      withdrawFees,
      cryptocurrency,
      cryptocurrencyPrices,
      networkFees
    )
  );
}

export function sellTotalFee(
  amount,
  tradingFeeFn,
  spreadFeeFn,
  withdrawMethodFeeFn
) {
  return (
    0 + // deposit crypto fee
    tradingFeeFn(amount) + // trading fee
    spreadFeeFn(amount) + // spread fee
    withdrawMethodFeeFn(amount) // withdraw fiat fee
  );
}

export function lowestFeeMethod(
  isBuy,
  amount,
  cryptocurrency,
  exchangeInfo,
  cryptocurrencyPrices,
  networkFees
) {
  const methods = isBuy
    ? exchangeInfo.depositMethods
    : exchangeInfo.withdrawMethods;
  return methods
    .filter((method) => amount >= method.min && amount <= method.max)
    .reduce((accumulator, currentMethod) => {
      const fee = isBuy
        ? (buyTotalFee(
            amount,
            cryptocurrency,
            cryptocurrencyPrices,
            networkFees,
            currentMethod.fee,
            exchangeInfo.tradingFee,
            exchangeInfo.realSpread,
            exchangeInfo.withdrawFee
          ) /
            amount) *
          100
        : (sellTotalFee(
            amount,
            exchangeInfo.tradingFee,
            exchangeInfo.realSpread,
            currentMethod.fee
          ) /
            amount) *
          100;
      if (Object.keys(accumulator).length === 0 || accumulator.fee > fee) {
        accumulator = {
          fee: fee.toFixed(2),
          exchangeInfo,
          method: currentMethod,
        };
      }
      return accumulator;
    }, {});
}
