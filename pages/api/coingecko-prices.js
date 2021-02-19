// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  getCoinPriceCacheLastUpdatedAt,
  coinPriceCache,
} from "../../lib/coingecko";

export default (req, res) => {
  // return res.sendStatus(401);
  res
    .status(200)
    .json({ lastUpdatedAt: getCoinPriceCacheLastUpdatedAt, coinPriceCache });
};
