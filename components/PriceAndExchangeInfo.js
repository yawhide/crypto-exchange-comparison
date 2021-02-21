import { FooterHelp, Link, SkeletonBodyText } from "@shopify/polaris";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import get from "lodash/get";

import React, { useEffect, useState } from "react";
import CoingeckoPriceData from "../src/fetch-coingeckoprices";

dayjs.extend(relativeTime);

function coingeckoFromNow(priceData) {
  const lastUpdatedAt = get(priceData, "data.coingeckoPrice.lastUpdatedAt");
  if (lastUpdatedAt) {
    return dayjs(lastUpdatedAt).fromNow();
  }
  return "";
}

function ethGasFromNow(priceData) {
  const lastUpdatedAt = get(priceData, "data.ethGasPrice.lastUpdatedAt");
  if (lastUpdatedAt) {
    return dayjs(lastUpdatedAt).fromNow();
  }
  return "";
}

export default function PriceAndExchangeInfo() {
  const [coingeckoLastUpdatedAt, setCoingeckoLastUpdatedAt] = useState("");
  const [ethgasLastUpdatedAt, setEthgasLastUpdatedAt] = useState("");

  let footerContents = null;

  const priceData = CoingeckoPriceData();

  if (priceData.isLoading) {
    footerContents = <SkeletonBodyText lines={2}></SkeletonBodyText>;
  } else if (priceData.isError) {
    footerContents = (
      <>
        <p>Error trying to fetch crypto prices.</p>
        <p>Exchange information updated as of Jan 25th 2021</p>
      </>
    );
  } else {
    const coingeckoFromNowDateString = coingeckoFromNow(priceData);
    const ethGasFromNowDateString = ethGasFromNow(priceData);
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
        <p>Exchange information updated as of Jan 25th 2021</p>
      </>
    );
  }

  useEffect(() => {
    if (priceData.data) {
      const interval = setInterval(() => {
        const coingeckoFromNowDateString = coingeckoFromNow(priceData);
        const ethGasFromNowDateString = ethGasFromNow(priceData);
        if (coingeckoFromNowDateString) {
          setCoingeckoLastUpdatedAt(coingeckoFromNowDateString);
        }
        if (ethGasFromNowDateString) {
          setEthgasLastUpdatedAt(ethGasFromNowDateString);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return <FooterHelp>{footerContents}</FooterHelp>;
}
