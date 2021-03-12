import Head from "next/head";
import {
  Card,
  Heading,
  Layout,
  Link,
  Page,
  ResourceItem,
  ResourceList,
  SkeletonBodyText,
  TextContainer,
  TextStyle,
} from "@shopify/polaris";
import React, { useState } from "react";
import PriceAndExchangeInfo from "../components/PriceAndExchangeInfo";
import { DATA } from "../public/data";
import PriceData from "../src/fetch-price-data";
import { lowestFeeMethod } from "../lib/fee-helper";

function calculateLowest3DepositsAndWithdraws(
  amount,
  cryptocurrencyPrices,
  networkFees
) {
  let deposits = [];
  let withdraws = [];
  Object.keys(DATA).forEach((exchangeID) => {
    const exchangeInfo = DATA[exchangeID];
    const deposit = lowestFeeMethod(
      true,
      amount,
      "BTC",
      exchangeInfo,
      cryptocurrencyPrices,
      networkFees
    );
    const withdraw = lowestFeeMethod(
      false,
      amount,
      "BTC",
      exchangeInfo,
      cryptocurrencyPrices,
      networkFees
    );
    if (Object.keys(deposit).length !== 0)
      deposits.push({ ...deposit, exchangeID });
    if (Object.keys(withdraw).length !== 0)
      withdraws.push({ ...withdraw, exchangeID });
  });
  return {
    deposits: deposits.sort((a, b) => a.fee - b.fee).slice(0, 3),
    withdraws: withdraws.sort((a, b) => a.fee - b.fee).slice(0, 3),
  };
}

function RenderResourceList(props) {
  const { amount, isBuy } = props;
  const PriceDataResponse = PriceData();

  if (PriceDataResponse.isLoading || PriceDataResponse.isError) {
    return (
      <Card sectioned>
        <SkeletonBodyText lines={2} />
        <SkeletonBodyText />
      </Card>
    );
  }

  const result = calculateLowest3DepositsAndWithdraws(
    amount,
    PriceDataResponse.data.cryptocurrencies.prices,
    PriceDataResponse.data.networkFees
  );
  const rows = isBuy ? result.deposits : result.withdraws;
  const items = rows.map((row) => ({
    fee: row.fee,
    method: row.method.type,
    name: row.exchangeInfo.name,
    url: `/exchanges/${row.exchangeID}`,
  }));

  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title={`$${amount}`}
          description={`Cheapest exchanges around the $${amount} mark.`}
        >
          <Card>
            <ResourceList
              resourceName={{ singular: "exchange", plural: "exchanges" }}
              items={items}
              renderItem={(item) => {
                const { fee, method, name, url } = item;

                return (
                  <ResourceItem
                    id={name}
                    url={url}
                    // media={media}
                    // accessibilityLabel={`View details for ${name}`}
                    // shortcutActions={shortcutActions}
                    // persistActions
                  >
                    <div style={{ display: "flex", textAlign: "center" }}>
                      <h3 style={{ flex: "0 1 33%" }}>
                        <TextStyle variation="strong">{name}</TextStyle>
                      </h3>
                      <div style={{ flex: "0 1 33%" }}>{method}</div>
                      <div style={{ flex: "0 1 33%" }}>{fee}%</div>
                    </div>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}

export default function Home(props) {
  const { buySellToggleState } = props;
  const method = buySellToggleState ? "funding" : "withdrawing";
  const buySell = buySellToggleState ? "buying" : "selling";
  return (
    <>
      <Head>
        <title>Cheapest canadian crypto exchanges</title>
        <meta
          name="description"
          content="Unbiased comparison of crypto exchanges usable by Canadians. Calculate fees for buying and selling bitcoin and ethereum."
        ></meta>
      </Head>
      <Page>
        <TextContainer>
          <Heading element="h2">Exchanges with the lowest fees.</Heading>
          <p>
            Quickly see which exchanges are cheapest around common price ranges.
            We are assuming you are {buySell} Bitcoin using the cheapest{" "}
            {method} method. For more detailed analysis, visit the{" "}
            <Link url="/calculator">fee calculator</Link>.
          </p>
        </TextContainer>
      </Page>
      <RenderResourceList amount={100} isBuy={buySellToggleState} />
      <RenderResourceList amount={500} isBuy={buySellToggleState} />
      <RenderResourceList amount={1000} isBuy={buySellToggleState} />
      <RenderResourceList amount={5000} isBuy={buySellToggleState} />
      <RenderResourceList amount={15000} isBuy={buySellToggleState} />
      <PriceAndExchangeInfo />
    </>
  );
}
