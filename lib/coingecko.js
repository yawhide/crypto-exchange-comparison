const CoinGecko = require("coingecko-api");
const fs = require("fs");

const CoinGeckoClient = new CoinGecko();
const COIN_GECKO_IDS = [
  "bitcoin",
  "ethereum",
  "tether",
  "polkadot",
  "ripple",
  "litecoin",
  "bitcoin-cash",
  "cardano",
  "chainlink",
  "stellar",
  "binancecoin",
  "usd-coin",
  "monero",
  "eos",
  "crypto-com-chain",
];
const COIN_MAPPING = {
  bitcoin: "BTC",
  ethereum: "ETH",
  tether: "USDT",
  polkadot: "DOT",
  ripple: "XRP",
  litecoin: "LTC",
  "bitcoin-cash": "BCH",
  cardano: "ADA",
  chainlink: "LINK",
  stellar: "XLM",
  binancecoin: "BNB",
  "usd-coin": "USDC",
  monero: "XMR",
  eos: "EOS",
  "crypto-com-chain": "EOS",
};

const TIMEOUT = 60 * 1000;
const COIN_GECKO_CACHE_FILEPATH = "./coin_gecko_cache.json";

let coinPriceCache = {};
if (fs.existsSync(COIN_GECKO_CACHE_FILEPATH)) {
  coinPriceCache = JSON.parse(
    fs.readFileSync(COIN_GECKO_CACHE_FILEPATH, "utf8")
  );
} else {
  fs.writeFileSync(COIN_GECKO_CACHE_FILEPATH, JSON.stringify(coinPriceCache));
}
let lastUpdatedAt = fs.statSync(COIN_GECKO_CACHE_FILEPATH).mtime.toISOString();

async function updateCoingeckoCacheAndDisk() {
  let result;
  try {
    result = await CoinGeckoClient.simple.price({
      ids: COIN_GECKO_IDS,
      vs_currencies: "cad",
    });
    if (result.code !== 200) {
      console.error("failed to query coingecko api.", result);
      return setTimeout(updateCoingeckoCacheAndDisk, TIMEOUT);
    }
  } catch (e) {
    console.error("error querying coingecko api.", e);
    return setTimeout(updateCoingeckoCacheAndDisk, TIMEOUT);
  }

  Object.keys(result.data).forEach((coinID) => {
    coinPriceCache[COIN_MAPPING[coinID]] = result.data[coinID].cad;
  });

  fs.writeFile(
    COIN_GECKO_CACHE_FILEPATH,
    JSON.stringify(coinPriceCache),
    (err) => {
      if (err) {
        console.error("error writing coingecko cache to disk.", err);
      } else {
        lastUpdatedAt = new Date().toISOString();
      }
      setTimeout(updateCoingeckoCacheAndDisk, TIMEOUT);
    }
  );
}

setTimeout(updateCoingeckoCacheAndDisk, TIMEOUT);
console.log("Started coingecko polling. Last updated at: ", lastUpdatedAt);

module.exports.coingeckoPricesLastUpdatedAt = lastUpdatedAt;
module.exports.coingeckoPrices = coinPriceCache;
