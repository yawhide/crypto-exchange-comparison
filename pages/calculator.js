import Head from "next/head";
import {
  Card,
  FormLayout,
  Heading,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Select,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import React, { useState } from "react";
import PriceAndExchangeInfo from "../components/PriceAndExchangeInfo";
import { DATA } from "../public/data";
import CoingeckoPriceData from "../src/fetch-coingeckoprices";

function methodTypeToExchangeInfoMapping(
  cryptocurrency,
  amount,
  buySellToggleState
) {
  if (cryptocurrency === "") return {};
  return Object.keys(DATA).reduce((accumulator, exchangeName) => {
    const exchangeInfo = DATA[exchangeName];
    if (buySellToggleState) {
      exchangeInfo.depositMethods
        .filter((method) => amount >= method.min && amount <= method.max)
        .forEach((method) => (accumulator[method.type] = exchangeInfo));
    } else {
      exchangeInfo.withdrawMethods
        .filter((method) => amount >= method.min && amount <= method.max)
        .forEach((method) => (accumulator[method.type] = exchangeInfo));
    }
    return accumulator;
  }, {});
}

export default function Home(props) {
  const { buySellToggleState } = props;
  const [amountInput, setAmountInput] = useState("1000");
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [methodType, setMethodType] = useState("select");
  const amount = parseInt(amountInput);

  const methodLabel = buySellToggleState ? "Deposit" : "Withdrawal";
  const methodTypeMapping = methodTypeToExchangeInfoMapping(
    cryptocurrency,
    amount,
    buySellToggleState
  );

  const coingeckoPriceDataResponse = CoingeckoPriceData();

  let items = [];
  if (
    coingeckoPriceDataResponse.data &&
    amount &&
    methodType &&
    cryptocurrency
  ) {
    items = Object.keys(DATA)
      .reduce((accumulator, exchangeID) => {
        const exchangeInfo = DATA[exchangeID];
        const method = buySellToggleState
          ? exchangeInfo.depositMethods.find(
              (method) => method.type === methodType
            )
          : exchangeInfo.withdrawMethods.find(
              (method) => method.type === methodType
            );
        if (!method) return accumulator;

        accumulator.push({
          fee: (
            method.fee(amount) +
            exchangeInfo.tradingFee(amount) +
            exchangeInfo.realSpread(amount) +
            (buySellToggleState
              ? exchangeInfo.withdrawFee[cryptocurrency] *
                  coingeckoPriceDataResponse.data.coingeckoPrice.prices[
                    cryptocurrency
                  ] || 0
              : 0)
          ).toFixed(2),
          method: methodType,
          name: exchangeInfo.name,
          url: `/exchanges/${exchangeID}`,
        });
        return accumulator;
      }, [])
      .sort((a, b) => a.fee - b.fee);
  }

  const onAmountChange = (newAmountInput) => {
    const methodTypeFound = Object.keys(
      methodTypeToExchangeInfoMapping(
        cryptocurrency,
        parseInt(newAmountInput),
        buySellToggleState
      )
    ).find((type) => type === methodType);

    if (!methodTypeFound) {
      setMethodType("select");
    }
    return setAmountInput(newAmountInput);
  };

  const methodOptions = [
    { label: "Select", value: "select", disabled: true },
  ].concat(
    Object.keys(methodTypeMapping).map((methodType) => ({
      label: methodType,
      value: methodType,
      disabled: false,
    }))
  );

  const heading =
    items.length > 0 ? (
      <div style={{ "margin-top": "2rem", "margin-bottom": "2rem" }}>
        <Heading element="h5">Results (cheapest to most expensive)</Heading>
      </div>
    ) : null;

  return (
    <>
      <Head>
        <title>Fee calculator for canadian crypto exchanges</title>
      </Head>
      <Page>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              type="number"
              label="Amount to buy/sell"
              value={amountInput}
              onChange={onAmountChange}
              min="10"
              step="10"
            />
            <Select
              label="Crypto currency"
              placeholder="Select"
              options={["BTC", "ETH"]}
              value={cryptocurrency}
              onChange={(newCryptocurrency) =>
                setCryptocurrency(newCryptocurrency)
              }
            />
            <Select
              label={`${methodLabel} Method`}
              options={methodOptions}
              value={methodType}
              onChange={(newMethodType) => setMethodType(newMethodType)}
            />
          </FormLayout.Group>
        </FormLayout>
        {heading}
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                resourceName={{ singular: "exchange", plural: "exchanges" }}
                items={items}
                renderItem={(item) => {
                  const { fee, method, name, url } = item;

                  return (
                    <ResourceItem id={name} url={url}>
                      <div style={{ display: "flex", textAlign: "center" }}>
                        <h3 style={{ flex: "0 1 33%" }}>
                          <TextStyle variation="strong">{name}</TextStyle>
                        </h3>
                        <div style={{ flex: "0 1 33%" }}>{method}</div>
                        <div style={{ flex: "0 1 33%" }}>${fee}</div>
                      </div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Layout.Section>
        </Layout>
        <PriceAndExchangeInfo />
      </Page>
    </>
  );
}
