import { FooterHelp, Link, SkeletonBodyText } from "@shopify/polaris";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import get from "lodash/get";
import React, { useEffect, useState } from "react";

import PriceData from "../src/fetch-price-data";

dayjs.extend(relativeTime);

function coingeckoFromNow(priceData) {
  const lastUpdatedAt = get(priceData, "data.cryptocurrencies.lastUpdatedAt");
  if (lastUpdatedAt) {
    return dayjs(lastUpdatedAt).fromNow();
  }
  return "";
}

function ethGasFromNow(priceData) {
  const lastUpdatedAt = get(priceData, "data.networkFees.ETH.lastUpdatedAt");
  if (lastUpdatedAt) {
    return dayjs(lastUpdatedAt).fromNow();
  }
  return "";
}

function btcNetworkFeeFromNow(priceData) {
  const lastUpdatedAt = get(priceData, "data.networkFees.BTC.lastUpdatedAt");
  if (lastUpdatedAt) {
    return dayjs(lastUpdatedAt).fromNow();
  }
  return "";
}

export default function PriceAndExchangeInfo() {
  const [coingeckoLastUpdatedAt, setCoingeckoLastUpdatedAt] = useState("");
  const [ethGasLastUpdatedAt, setEthGasLastUpdatedAt] = useState("");
  const [btcNetworkFeeLastUpdatedAt, setBtcNetworkFeeLastUpdatedAt] = useState(
    ""
  );

  let footerContents = null;

  const priceData = PriceData();

  if (priceData.isLoading) {
    footerContents = <SkeletonBodyText lines={2}></SkeletonBodyText>;
  } else if (priceData.isError) {
    footerContents = (
      <>
        <p>Error trying to fetch crypto prices.</p>
        <p>Exchange information updated as of Mar 13th 2021</p>
      </>
    );
  } else {
    const coingeckoFromNowDateString = coingeckoFromNow(priceData);
    const ethGasFromNowDateString = ethGasFromNow(priceData);
    const btcNetworkFeeFromNowDateString = btcNetworkFeeFromNow(priceData);
    footerContents = (
      <>
        <p>
          <Link url="https://coingecko.com" external={true}>
            Crypto prices
          </Link>{" "}
          last updated {coingeckoFromNowDateString}
        </p>
        <p>
          <Link url="https://ethgasstation.info" external={true}>
            Ethereum gas prices
          </Link>{" "}
          last updated {ethGasFromNowDateString}
        </p>
        <p>
          <Link url="https://bitcoinfees.earn.com/" external={true}>
            Bitcoin network fee
          </Link>{" "}
          last updated {btcNetworkFeeFromNowDateString}
        </p>
        <p>Exchange information updated as of Mar 13th 2021</p>
      </>
    );
  }

  useEffect(() => {
    if (priceData.data) {
      const interval = setInterval(() => {
        const coingeckoFromNowDateString = coingeckoFromNow(priceData);
        const ethGasFromNowDateString = ethGasFromNow(priceData);
        const btcNetworkFeeFromNowDateString = btcNetworkFeeFromNow(priceData);
        if (coingeckoFromNowDateString) {
          setCoingeckoLastUpdatedAt(coingeckoFromNowDateString);
        }
        if (ethGasFromNowDateString) {
          setEthGasLastUpdatedAt(ethGasFromNowDateString);
        }
        if (btcNetworkFeeFromNowDateString) {
          setEthGasLastUpdatedAt(btcNetworkFeeFromNowDateString);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return <FooterHelp>{footerContents}</FooterHelp>;
}
