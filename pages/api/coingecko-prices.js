// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  coingeckoPricesLastUpdatedAt,
  coingeckoPrices,
} from "../../lib/coingecko";
import { ethGasPriceLastUpdatedAt, ethGasPrices } from "../../lib/ethGasPrice";

export default (req, res) => {
  const body = {
    coingeckoPrice: {
      lastUpdatedAt: coingeckoPricesLastUpdatedAt,
      prices: coingeckoPrices,
    },
    ethGasPrice: {
      fast: ethGasPrices.fast,
      lastUpdatedAt: ethGasPriceLastUpdatedAt,
    },
  };
  res.status(200).json(body);
};
