import { FooterHelp, SkeletonBodyText } from "@shopify/polaris";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import React, { useEffect, useState } from "react";
import CoingeckoPriceData from "../src/fetch-coingeckoprices";

dayjs.extend(relativeTime);

export default function PriceAndExchangeInfo() {
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");

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
    const lastUpdatedAt = dayjs(priceData.data.lastUpdatedAt).fromNow();
    footerContents = (
      <>
        <p>Crypto prices last updated {lastUpdatedAt}</p>
        <p>Exchange information updated as of Jan 25th 2021</p>
      </>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (priceData.data && priceData.data.lastUpdatedAt) {
        setLastUpdatedAt(dayjs(priceData.data.lastUpdatedAt).fromNow());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <FooterHelp>{footerContents}</FooterHelp>;
}
