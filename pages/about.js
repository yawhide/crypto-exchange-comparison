// import styles from "../styles/Home.module.css";
import { Link, Page, TextContainer } from "@shopify/polaris";
import React, { useState } from "react";

export default function Home() {
  return (
    <Page>
      <TextContainer spacing="loose">
        {/* <Heading>Install the Shopify POS App</Heading>
        <p>
          Shopify POS is the easiest way to sell your products in person.
          Available for iPad, iPhone, and Android.
        </p>
        <div style="padding-bottom: 80px;"></div> */}
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
          and you can find all the exchange information including spreads, fees,
          KYC times, support response times and more in this public{" "}
          <Link
            url="https://docs.google.com/spreadsheets/d/1HP2uWOCRUXgVHEsr9ge1rW-kGpwsxWWBe7rFovFE0Bg"
            external={true}
          >
            google spreadsheet
          </Link>
        </p>
        <p>
          We are currently focussing on exchanges which accept Canadian dollars
          but will expand into more currencies in the future.
        </p>
        <p>
          If you have any feedback, please create a discussion on{" "}
          <Link
            url="https://github.com/mcscrad/crypto-exchange-comparison/discussions"
            external={true}
          >
            Github
          </Link>
        </p>
      </TextContainer>
    </Page>
  );
}
