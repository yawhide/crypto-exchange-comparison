import "@shopify/polaris/dist/styles.css";
import {
  AppProvider,
  FormLayout,
  Frame,
  Modal,
  Navigation,
  TextField,
  TopBar,
} from "@shopify/polaris";
import {
  CircleInformationMajor,
  ListMajor,
  MonerisMajor,
} from "@shopify/polaris-icons";
import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const navigationMarkup = (
    <Navigation location={router.pathname}>
      <Navigation.Section
        // separator
        title="Crypto Rationale"
        items={[
          {
            label: "Summary",
            icon: ListMajor,
            url: "/",
            exactMatch: true,
          },
          {
            label: "Fee Calculator",
            icon: MonerisMajor,
            url: "/calculator",
            exactMatch: true,
          },
          {
            label: "About",
            icon: CircleInformationMajor,
            url: "/about",
            exactMatch: true,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          crossorigin="anonymous"
        />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Component {...pageProps} />
      </Container>
    </>
  );
}

export default MyApp;
