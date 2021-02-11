// import styles from "../styles/Home.module.css";
import {
  Avatar,
  Card,
  Checkbox,
  FormLayout,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Select,
  SkeletonBodyText,
  TextField,
  TextStyle,
  Toast,
} from "@shopify/polaris";
import React, { useState } from "react";
import useSWR from "swr";
import { DATA } from "../public/data";

function CoingeckoPriceData() {
  const { data, error } = useSWR(`/api/coingecko-prices`);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Home() {
  const [checked, setChecked] = useState(true);
  const [amountInput, setAmountInput] = useState("1000");
  const [cryptocurrency, setCryptocurrency] = useState("");
  const [methodType, setMethodType] = useState("");
  const checkbox = (
    <Checkbox
      label="Sell / Buy"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
  const amount = parseInt(amountInput);
  const methodLabel = checked ? "Deposit" : "Withdrawal";
  const methodToExchangeInfoMapping =
    cryptocurrency === ""
      ? {}
      : Object.keys(DATA).reduce((accumulator, exchangeName) => {
          const exchangeInfo = DATA[exchangeName];
          if (checked) {
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
  const coingeckoPriceDataResponse = CoingeckoPriceData();

  let items = [];
  if (
    coingeckoPriceDataResponse.data &&
    amount &&
    methodType &&
    cryptocurrency
  ) {
    items = Object.values(DATA)
      .reduce((accumulator, exchangeInfo) => {
        const method = checked
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
            (checked
              ? exchangeInfo.withdrawFee[cryptocurrency] *
                  coingeckoPriceDataResponse.data.coinPriceCache[
                    cryptocurrency
                  ] || 0
              : 0)
          ).toFixed(2),
          method: methodType,
          name: exchangeInfo.name,
          url: `/exchanges/${exchangeInfo.name}`,
        });
        return accumulator;
      }, [])
      .sort((a, b) => a.fee - b.fee);
  }

  return (
    <Page primaryAction={checkbox}>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            type="number"
            label="Amount to buy/sell"
            value={amountInput}
            onChange={(newAmountInput) => setAmountInput(newAmountInput)}
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
            // error={Boolean(!unit && weight)}
          />
          <Select
            label={`${methodLabel} Method`}
            placeholder="Select"
            options={Object.keys(methodToExchangeInfoMapping)}
            value={methodType}
            onChange={(newMethodType) => setMethodType(newMethodType)}
            // error={Boolean(!unit && weight)}
          />
        </FormLayout.Group>
      </FormLayout>
      <Layout sectioned>
        <Layout.AnnotatedSection title="" description="">
          <Card>
            <ResourceList
              resourceName={{ singular: "exchange", plural: "exchanges" }}
              items={items}
              renderItem={(item) => {
                const { fee, method, name, url } = item;
                // const { id, url, name, location, latestOrderUrl } = item;
                // const media = <Avatar customer size="medium" name={name} />;
                // const shortcutActions = latestOrderUrl
                //   ? [
                //       {
                //         content: "View latest order",
                //         accessibilityLabel: `View ${name}’s latest order`,
                //         url: latestOrderUrl,
                //       },
                //     ]
                //   : null;
                // const name = exchangeInfo.name;

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
                      <h3
                        style={{ flex: "0 1 33%", textTransform: "capitalize" }}
                      >
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
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
