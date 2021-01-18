var DATA = {
  newton: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 10,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 1000000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 10,
        max: 10000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 10,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => (i < 10000 ? 50 : 0),
        min: 10000,
        max: 1000000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 10,
        max: 10000,
      },
    ],
    tradingFee: (i) => 0,
    realSpread: (i) => 0.0043 * i,
    withdrawFee: {},
    coins: {
      BTC: true,
      ETH: true,
      XRP: true,
      BCH: true,
      LTC: true,
      USDT: true,
      XLM: true,
      XMR: true,
      USDC: true,
      QCAD: true,
    },
  },
  "Paytrie + Binance": {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 100,
        max: 2000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 100,
        max: 5000,
      },
    ],
    tradingFee: (i) => 0.001 * i + (i < 500 ? 5 : 0.01 * i),
    realSpread: (i) => 0,
    withdrawFee: {
      BTC: 0.0005,
      ETH: 0.005,
    },
    coins: {
      LOTS: true,
    },
  },
  shakepay: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 5,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 1000,
        max: 10000000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 5,
        max: 5000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 5000,
        max: 10000000,
      },
    ],
    tradingFee: (i) => 0,
    realSpread: (i) => 0.0195 * i,
    withdrawFee: {},
    coins: {
      BTC: true,
      ETH: true,
    },
  },
  coinberry: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 500000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 100,
        max: 5000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 500000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 100,
        max: 5000,
      },
    ],
    tradingFee: (i) => 0,
    realSpread: (i) => 0.0236 * i,
    withdrawFee: {
      BTC: 0.001,
      ETH: 0.011,
    },
    coins: {
      BTC: true,
      ETH: true,
      XRP: true,
      BCH: true,
      LTC: true,
      XLM: true,
    },
  },
  netcoins: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 10,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 500,
        max: 10000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 10000000,
      },
    ],
    tradingFee: (i) => 0.005 * i,
    realSpread: (i) => 0.0533 * i,
    withdrawFee: {
      BTC: 0.0005,
      ETH: 0.02,
    },
    coins: {
      BTC: true,
      ETH: true,
      XRP: true,
      BCH: true,
      LTC: true,
      USDT: true,
      QCAD: true,
    },
  },
  "Bull bitcoin": {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 0,
        max: 50000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => {
          percent = 0;
          if (i <= 100) percent = 0;
          else if (i <= 1000) percent = 0.005;
          else if (i <= 3000) percent = 0.0075;
          else percent = 0.01;
          return percent * i;
        },
        min: 25,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0.0125 * i,
        min: 25,
        max: 500000,
      },
      {
        type: "EFT",
        fee: (i) => 0,
        min: 25,
        max: 10000000,
      },
    ],
    tradingFee: (i) => 0,
    realSpread: (i) => 0.0167 * i,
    withdrawFee: {},
    coins: {
      BTC: true,
    },
  },
  coinsquare: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0.015 * i,
        min: 20,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 10000000,
      },
    ],
    withdrawMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 0.02 * i,
        min: 10000,
        max: 10000000,
      },
      {
        type: "EFT",
        fee: (i) => 0.02 * i,
        min: 20,
        max: 10000,
      },
    ],
    tradingFee: (i, coin) => (coin === "BTC" ? 0.002 : 0.004) * i,
    realSpread: (i) => 0.0253 * i,
    withdrawFee: {
      BTC: 0.0005,
      ETH: 0.005,
    },
    coins: {
      BTC: true,
      XLM: true,
      BSV: true,
      DASH: true,
      ETH: true,
      DOGE: true,
      XRP: true,
      BAB: true,
      ETC: true,
      LTC: true,
    },
  },
  bitbuy: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0.015 * i,
        min: 100,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0.005 * i,
        min: 20000,
        max: 500000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0.015 * i,
        min: 50,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0.015 * i,
        min: 20000,
        max: 500000,
      },
    ],
    tradingFee: (i) => 0.005,
    realSpread: (i) => 0.0148 * i,
    withdrawFee: {
      BTC: 0.00025,
      ETH: 0.01,
    },
    coins: {
      BTC: true,
      XRP: true,
      BCH: true,
      LTC: true,
      USDT: true,
      XLM: true,
      XMR: true,
      USDC: true,
      QCAD: true,
    },
  },
  ndax: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000000,
      },
      {
        type: "Bank draft",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
    ],
    withdrawMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 25,
        min: 1,
        max: 10000000,
      },
      {
        type: "EFT",
        fee: (i) => 25,
        min: 1,
        max: 10000000,
      },
    ],
    tradingFee: (i) => 0.002 * i,
    realSpread: (i) => 0.0042 * i,
    withdrawFee: {
      BTC: 0.000399,
      ETH: 0.0099,
    },
    coins: {
      BTC: true,
      ETH: true,
      XRP: true,
      USDT: true,
      LINK: true,
      LTC: true,
      ADA: true,
      DOGE: true,
      EOS: true,
      XLM: true,
    },
  },
  mybtc: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0.0775 * i,
        min: 30,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0.0475 * i,
        min: 10000,
        max: 250000,
      },
      {
        type: "Credit card",
        fee: (i) => 0.0975 * i,
        min: 75,
        max: 25000,
      },
    ],
    withdrawMethods: [],
    tradingFee: (i) => (i <= 200 ? 2 : 0),
    realSpread: (i) => 0.009 * i,
    withdrawFee: {},
    coins: {
      BTC: true,
    },
  },
  coinsmart: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => (i < 2000 ? 0.015 * i : 0),
        min: 100,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10000,
        max: 1000000,
      },
      {
        type: "Credit card",
        fee: (i) => Math.max(10, 0.06 * i),
        min: 50,
        max: 20000,
      },
    ],
    withdrawMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 0.01,
        min: 10000,
        max: 1000000,
      },
      {
        type: "EFT",
        fee: (i) => Math.max(15, 0.01 * i),
        min: 50,
        max: 10000,
      },
    ],
    tradingFee: (i, coin) => (coin === "BTC" ? 0.002 : 0.004) * i,
    realSpread: (i) => 0.0237 * i,
    withdrawFee: {
      BTC: 0.0005,
      ETH: 0.015,
    },
    coins: {
      BTC: true,
      ETH: true,
      LTC: true,
      XRP: true,
      BCH: true,
      USDT: true,
      EOS: true,
      NEO: true,
      XLM: true,
      ADA: true,
      QCAD: true,
    },
  },
  coinbase: {
    depositMethods: [
      {
        type: "Debit card",
        fee: (i) => 0.0399 * i,
        min: 5,
        max: 1500,
      },
      {
        type: "Credit card",
        fee: (i) => 0.0399 * i,
        min: 5,
        max: 1500,
      },
    ],
    withdrawMethods: [],
    tradingFee: (i) => 0.015 * i,
    realSpread: (i) => 0.0093 * i,
    withdrawFee: {
      BTC: 0.00003442,
      ETH: 0.001827,
    },
    coins: {
      LOTS: true,
    },
  },
  kraken: {
    depositMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 125,
        max: 10000000,
      },
      {
        type: "In person Canada Post",
        fee: (i) => 1.25 + 0.0025 * i,
        min: 20,
        max: 500,
      },
    ],
    withdrawMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 13,
        min: 14,
        max: 100000,
      },
      {
        type: "EFT",
        fee: (i) => 0.0025 * i,
        min: 125,
        max: 10000,
      },
    ],
    tradingFee: (i) => 0.0021 * i,
    realSpread: (i) => 0 * i,
    withdrawFee: {
      BTC: 0.0005,
      ETH: 0.005,
    },
    coins: {
      LOTS: true,
    },
  },
  gemini: {
    depositMethods: [
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 100,
        max: 10000000,
      },
      {
        type: "Debit card",
        fee: (i) => 0.0349 * i,
        min: 1,
        max: 1000,
      },
    ],
    withdrawMethods: [],
    tradingFee: (i) => {
      if (i <= 15) return 1.49;
      else if (i <= 50) return 2.99;
      else if (i <= 100) return 3.99;
      else if (i <= 250) return 4.99;
      else return 0.0149 * i;
    },
    realSpread: (i) => 0.0145 * i,
    withdrawFee: {},
    coins: {
      LOTS: true,
    },
  },
  localbitcoins: {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 10, // 0.0001 btc
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10, // 0.0001 btc
        max: 10000000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 1,
        max: 10000,
      },
      {
        type: "Wire transfer",
        fee: (i) => 0,
        min: 10, // 0.0001 btc
        max: 10000000,
      },
    ],
    tradingFee: (i) => 0,
    realSpread: (i) => 0.0498 * i,
    withdrawFee: {
      BTC: 0.00004949,
    },
    coins: {
      BTC: true,
    },
  },
  "crypto.com": {
    depositMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 100,
        max: 3000,
      },
    ],
    withdrawMethods: [
      {
        type: "E-transfer",
        fee: (i) => 0,
        min: 100,
        max: 3000,
      },
    ],
    tradingFee: (i) => 0.0016 * i,
    realSpread: (i) => 0.0145 * i,
    withdrawFee: {
      BTC: 0.0004,
      ETH: 0.005,
    },
    coins: {
      LOTS: true,
    },
  },
};
