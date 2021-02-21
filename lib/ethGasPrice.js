const axios = require("axios");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { coingeckoPrices } = require("./coingecko");

const ETH_GAS_PRICE_FILEPATH = "./eth_gas_price.json";
const TIMEOUT = 60 * 1000;

let ethGasPrice = {};
if (fs.existsSync(ETH_GAS_PRICE_FILEPATH)) {
  ethGasPrice = JSON.parse(fs.readFileSync(ETH_GAS_PRICE_FILEPATH, "utf8"));
} else {
  fs.writeFileSync(ETH_GAS_PRICE_FILEPATH, JSON.stringify(ethGasPrice));
}
let lastUpdatedAt = fs.statSync(ETH_GAS_PRICE_FILEPATH).mtime.toISOString();

function updateEthGasPrices() {
  if (!coingeckoPrices || !coingeckoPrices.ETH) {
    console.warn(
      "skipping updating eth gas price poll due to missing coingecko prices."
    );
    return setTimeout(updateEthGasPrices, TIMEOUT);
  }

  axios
    .get("https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json", {
      params: { "api-key": process.env.ETHGASSTATION_API_KEY },
    })
    .then(function (response) {
      ethGasPrice.fast =
        (response.data.fast / 10) * 0.000000001 * coingeckoPrices.ETH * 21000;

      return fsPromises
        .writeFile(ETH_GAS_PRICE_FILEPATH, JSON.stringify(ethGasPrice))
        .then(() => {
          lastUpdatedAt = new Date().toISOString();
        })
        .catch((error) => {
          console.log("Error writing eth gas price to disk.", error);
        });
    })
    .catch(function (error) {
      console.error("Failed to query for eth gas prices.", error);
    })
    .finally(() => {
      setTimeout(updateEthGasPrices, TIMEOUT);
    });
}

setTimeout(updateEthGasPrices, TIMEOUT);
console.log("Started eth gas price polling. Last updated at: ", lastUpdatedAt);

module.exports.ethGasPriceLastUpdatedAt = lastUpdatedAt;
module.exports.ethGasPrices = ethGasPrice;
