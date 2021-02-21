import Head from "next/head";
import {
  Banner,
  Card,
  DataTable,
  DescriptionList,
  DisplayText,
  Icon,
  Layout,
  Link,
  Page,
  SkeletonBodyText,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { MobileAcceptMajor, MobileCancelMajor } from "@shopify/polaris-icons";
import { DATA } from "../../public/data";
import PriceAndExchangeInfo from "../../components/PriceAndExchangeInfo";
import CoingeckoPriceData from "../../src/fetch-coingeckoprices";

function Calculator(props) {
  const { buy, exchange } = props;
  const [amount, setAmount] = useState("1000");
  let rows, total;

  const coingeckoPriceDataResponse = CoingeckoPriceData();
  if (
    coingeckoPriceDataResponse.isError ||
    coingeckoPriceDataResponse.isLoading
  ) {
    return (
      <Card sectioned>
        <SkeletonBodyText lines={2} />
        <SkeletonBodyText />
      </Card>
    );
  }

  const fiatDepositFee = exchange.depositMethods.reduce((lowestFee, method) => {
    const fee = method.fee(amount);
    return Math.min(fee, lowestFee);
  }, Infinity);
  const tradingFee = exchange.tradingFee(amount);
  const spreadFee = exchange.realSpread(amount);
  const cryptoWithdrawalFee =
    (exchange.withdrawFee["BTC"] || 0) *
    coingeckoPriceDataResponse.data.coingeckoPrice.prices.BTC;
  const fiatWithdrawalFee = exchange.withdrawMethods.reduce(
    (lowestFee, method) => {
      const fee = method.fee(amount);
      return Math.min(fee, lowestFee);
    },
    Infinity
  );

  if (buy) {
    rows = [
      ["FIAT Deposit Fee", `$${fiatDepositFee.toFixed(2)}`],
      ["Trading Fee", `$${tradingFee.toFixed(2)}`],
      ["Spread/Slippage Fee", `$${spreadFee.toFixed(2)}`],
      ["Crypto withdrawal Fee", `$${cryptoWithdrawalFee.toFixed(2)}`],
    ];
    total =
      "$" +
      (fiatDepositFee + tradingFee + spreadFee + cryptoWithdrawalFee).toFixed(
        2
      );
  } else {
    rows = [
      ["Trading Fee", `$${tradingFee.toFixed(2)}`],
      ["Spread/Slippage Fee", `$${spreadFee.toFixed(2)}`],
      ["FIAT Withdraw Fee", `$${fiatWithdrawalFee.toFixed(2)}`],
    ];
    total = "$" + (tradingFee + spreadFee + fiatWithdrawalFee).toFixed(2);
  }

  return (
    <Layout>
      <Layout.Section secondary>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(newAmount) => setAmount(newAmount)}
          min="10"
          step="10"
        />
      </Layout.Section>
      <Layout.Section>
        <Card title="">
          <DataTable
            showTotalsInFooter
            columnContentTypes={["text", "numeric"]}
            headings={[]}
            rows={rows}
            totals={["", total]}
            totalsName={{
              singular: "Total",
              plural: "Total",
            }}
          />
        </Card>
      </Layout.Section>
    </Layout>
  );
}

function Exchange(props) {
  const { buySellToggleState, exchangeName } = props;
  const exchange = Object.assign({}, DATA[exchangeName], {
    coins: Object.keys(DATA[exchangeName].coins).join(", "),
    fiatFundingOptions: DATA[exchangeName].depositMethods
      .map((method) => method.type)
      .join(", "),
    fiatWithdrawalOptions: DATA[exchangeName].withdrawMethods
      .map((method) => method.type)
      .join(", "),
  });

  const calculator =
    exchange.withdrawMethods.length === 0 && buySellToggleState === false ? (
      <Banner title="Withdrawals are not supported." status="warning"></Banner>
    ) : (
      <Calculator buy={buySellToggleState} exchange={exchange} />
    );

  return (
    <div>
      <Head>
        <title>{exchange.name}</title>
      </Head>
      <Page>
        <Link url={exchange.url} external={true}>
          <DisplayText size="large">{exchange.name}</DisplayText>
        </Link>
      </Page>
      <Page title="Fees">{calculator}</Page>
      <Page title="Referral">
        <DescriptionList
          items={[
            {
              term: "Rule",
              description: (
                <Link url={exchange.referral.url} external={true}>
                  {exchange.referral.text}
                </Link>
              ),
            },
          ]}
        />
      </Page>
      <Page title="Features">
        <DescriptionList
          items={[
            {
              term: "Coins",
              description: exchange.coins,
            },
            {
              term: "OTC",
              description: (
                <Icon
                  source={exchange.otc ? MobileAcceptMajor : MobileCancelMajor}
                />
              ),
            },
            {
              term: "Recurring Buy",
              description: (
                <Icon
                  source={
                    exchange.recurringBuy
                      ? MobileAcceptMajor
                      : MobileCancelMajor
                  }
                />
              ),
            },
            {
              term: "FIAT Funding options",
              description: exchange.fiatFundingOptions,
            },
            {
              term: "FIAT Withdrawal options",
              description: exchange.fiatWithdrawalOptions,
            },
          ]}
        />
      </Page>
      <Page title="KYC">
        <DescriptionList
          items={[
            {
              term: "Documents",
              description: exchange.kyc.documents,
            },
            {
              term: "Processing time",
              description: exchange.kyc.processing,
            },
          ]}
        />
      </Page>
      <Page title="Support">
        <DescriptionList
          items={[
            {
              term: "Response time",
              description: exchange.support.responseTime,
            },
          ]}
        />
      </Page>
      <PriceAndExchangeInfo />
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const exchangeIDs = Object.keys(DATA);
  const paths = exchangeIDs.map((exchangeID) => `/exchanges/${exchangeID}`);

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return {
    props: {
      exchangeName: params.name,
    },
  };
}

export default Exchange;
