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
  Select,
  SkeletonBodyText,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { MobileAcceptMajor, MobileCancelMajor } from "@shopify/polaris-icons";
import { DATA } from "../../public/data";
import PriceAndExchangeInfo from "../../components/PriceAndExchangeInfo";
import CoingeckoPriceData from "../../src/fetch-coingeckoprices";

function methodTypeToExchangeInfoMapping(exchange, amount, buy) {
  if (buy) {
    return exchange.depositMethods
      .filter((method) => amount >= method.min && amount <= method.max)
      .reduce((accumulator, method) => {
        accumulator[method.type] = exchange;
        return accumulator;
      }, {});
  } else {
    return exchange.withdrawMethods
      .filter((method) => amount >= method.min && amount <= method.max)
      .reduce((accumulator, method) => {
        accumulator[method.type] = exchange;
        return accumulator;
      }, {});
  }
}

function Calculator(props) {
  const { buy, exchange } = props;
  const [amount, setAmount] = useState("1000");
  const [cryptocurrency, setCryptocurrency] = useState("BTC");
  const [methodType, setMethodType] = useState("select");

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

  const onAmountChange = (newAmountInput) => {
    const methodTypeFound = Object.keys(
      methodTypeToExchangeInfoMapping(exchange, parseInt(newAmountInput), buy)
    ).find((type) => type === methodType);

    if (!methodTypeFound) {
      setMethodType("select");
    }
    return setAmount(newAmountInput);
  };
  const tradingFee = exchange.tradingFee(amount);
  const spreadFee = exchange.realSpread(amount);
  const cryptoWithdrawalFee =
    (exchange.withdrawFee[cryptocurrency] || 0) *
    coingeckoPriceDataResponse.data.coingeckoPrice.prices[cryptocurrency];
  const methodLabel = buy ? "Deposit" : "Withdrawal";
  const methodTypeMapping = methodTypeToExchangeInfoMapping(
    exchange,
    amount,
    buy
  );
  const methodOptions = [
    { label: "Select", value: "select", disabled: true },
  ].concat(
    Object.keys(methodTypeMapping).map((methodType) => ({
      label: methodType,
      value: methodType,
      disabled: false,
    }))
  );
  let rows, total;

  if (buy) {
    const depositMethod = exchange.depositMethods.find(
      (method) => method.type === methodType
    );
    const fiatDepositFee = depositMethod ? depositMethod.fee(amount) : 0;
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
    const withdrawalMethod = exchange.withdrawMethods.find(
      (method) => method.type === methodType
    );
    const fiatWithdrawalFee = withdrawalMethod
      ? withdrawalMethod.fee(amount)
      : 0;
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
          onChange={onAmountChange}
          min="10"
          step="10"
        />
        <Select
          label="Crypto currency"
          options={["BTC"].concat(
            exchange.coins.ETH || exchange.coins.LOTS ? ["ETH"] : []
          )}
          onChange={(newCryptocurrency) => setCryptocurrency(newCryptocurrency)}
          value={cryptocurrency}
        />
        <Select
          label={`${methodLabel} Method`}
          options={methodOptions}
          value={methodType}
          onChange={(newMethodType) => setMethodType(newMethodType)}
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
              description: Object.keys(DATA[exchangeName].coins).join(", "),
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
