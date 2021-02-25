import Head from "next/head";
import { Link, Page, TextContainer } from "@shopify/polaris";
import React, { useState } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Learn about our mission, where to provide feedback and how we calculate the fees charged by exchanges."
        ></meta>
      </Head>
      <Page>
        <TextContainer spacing="loose">
          <p>
            Crypto Rationale is the best website to find unbiased exchange
            comparisons.
          </p>
          <p>
            In order to ensure we keep our promise to being unbiased, we open
            sourced this website on{" "}
            <Link
              url="https://github.com/mcscrad/crypto-exchange-comparison"
              external={true}
            >
              Github
            </Link>{" "}
            and you can find all the exchange information including spreads,
            fees, KYC times, support response times and more in this public{" "}
            <Link
              url="https://docs.google.com/spreadsheets/d/1HP2uWOCRUXgVHEsr9ge1rW-kGpwsxWWBe7rFovFE0Bg"
              external={true}
            >
              google spreadsheet
            </Link>
            .
          </p>
          <p>
            We are currently focussing on exchanges which accept Canadian
            dollars but will expand into more currencies in the future.
          </p>
          <p>
            If you have any feedback or want to report any inaccuracies, please
            create a discussion on our{" "}
            <Link
              url="https://github.com/mcscrad/crypto-exchange-comparison/discussions"
              external={true}
            >
              discussion board
            </Link>
            .
          </p>
        </TextContainer>
      </Page>
    </>
  );
}
