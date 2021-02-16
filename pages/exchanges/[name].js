import { DATA } from "../../public/data";
import {
  Card,
  DataTable,
  DescriptionList,
  Icon,
  Page,
  SkeletonBodyText,
  TextField,
  Toast,
} from "@shopify/polaris";
import React, { useState } from "react";
import { MobileAcceptMajor, MobileCancelMajor } from "@shopify/polaris-icons";
import CoingeckoPriceData from "../../src/fetch-coingeckoprices";

function Calculator(props) {
  const { buy, exchange, amount } = props;
  let rows, total;

  const [action, setActive] = useState(true);

  const coingeckoPriceDataResponse = CoingeckoPriceData();
  // console.log("error:", !!coingeckoPriceDataResponse.isError);
  // if (coingeckoPriceDataResponse.isError) {
  //   setActive(() => true);
  // }
  // const coingeckoPriceDataErrorToast = coingeckoPriceDataResponse.isError ? (

  // ) : null;
  // let action, setActive;
  // let renderErrorToast = null;
  let toast = null;
  if (coingeckoPriceDataResponse.isError) {
    toast = (
      <Toast
        content="Error fetching prices"
        error
        onDismiss={() => setActive((_) => false)}
      />
    );
  }
  if (
    coingeckoPriceDataResponse.isError ||
    coingeckoPriceDataResponse.isLoading
  ) {
    return (
      <Card sectioned>
        <SkeletonBodyText lines={2} />
        <SkeletonBodyText />
        {toast}
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
    coingeckoPriceDataResponse.data.coinPriceCache.BTC;
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
    <Card>
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
  const [amount, setAmount] = useState("1000");

  return (
    <div>
      <Page title="Fees">
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(newAmount) => setAmount(newAmount)}
          min="10"
          step="10"
        />
        <Calculator
          amount={amount}
          buy={buySellToggleState}
          exchange={exchange}
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
      <Page title="Referral">
        <DescriptionList
          items={[
            {
              term: "Rule",
              description: exchange.referral.text,
            },
          ]}
        />
      </Page>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const res = await fetch("https://.../posts");
  // const posts = await res.json();
  const exchanges = Object.values(DATA);

  // Get the paths we want to pre-render based on posts
  const paths = exchanges.map((exchange) => `/exchanges/${exchange.name}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`);
  // const post = await res.json();
  // Pass post data to the page via props
  return {
    props: {
      exchangeName: params.name,
    },
  };
}

export default Exchange;
