(function (exports) {
  var DATA = {
    newton: {
      name: "Newton",
      url: "https://newton.co",
      referral: {
        url: "https://web.newton.co/r/CPH3MB",
        text: "$25 if you spend $100",
      },
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
      realSpread: (i) => 0.0059 * i,
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
      kyc: {
        documents: "Bank account, selfie, utility bill and photo ID",
        processing: "Instant or 2-4 business days",
      },
      support: {
        responseTime: "Days (took 2 and 8 business days personally)",
      },
      otc: false,
      recurringBuy: false,
    },
    "Paytrie + Binance": {
      name: "Paytrie + Binance",
      url: "https://paytrie.com",
      referral: {
        url: "https://paytrie.com/?ref=vxiZrU2L9",
        text: "$20 trading fee credit",
      },
      depositMethods: [
        {
          type: "E-transfer",
          fee: (i) => 0,
          min: 100,
          max: 2500,
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
      tradingFee: (i) => 0.001 * i + Math.max(5, i * 0.006),
      realSpread: (i) => 0,
      withdrawFee: {
        BTC: 0.0005,
        ETH: 0.005,
      },
      coins: {
        LOTS: true,
      },
      kyc: {
        documents: "Soft credit check and/or 2 pieces of photo ID",
        processing: "Instant or 1 business day",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    shakepay: {
      name: "Shakepay",
      url: "https://shakepay.com/",
      referral: {
        url: "https://shakepay.me/r/G4W9XPF",
        text: "$30 if you spend $100",
      },
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
      realSpread: (i) => 0.0175 * i,
      withdrawFee: {},
      coins: {
        BTC: true,
        ETH: true,
      },
      kyc: {
        documents: "Soft credit check and/or selfie and photo ID",
        processing: "Instant or 2 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    coinberry: {
      name: "Coinberry",
      url: "https://www.coinberry.com",
      referral: {
        url: "https://app.coinberry.com/invite/6e6c3019bb6",
        text: "$20 if you spend $50",
      },
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
      realSpread: (i) => 0.0268 * i,
      withdrawFee: {
        BTC: 0.0003,
        ETH: 0.011,
        LTC: 0.02,
        XRP: 1,
        XLM: 1,
        BCH: 0.00002,
      },
      coins: {
        BTC: true,
        ETH: true,
        XRP: true,
        BCH: true,
        LTC: true,
        XLM: true,
      },
      kyc: {
        documents:
          "Soft credit check and/or selfie, photo ID and proof of residence",
        processing: "1 business day",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: true,
    },
    netcoins: {
      name: "Netcoins",
      url: "https://netcoins.ca/",
      referral: {
        url: "https://netcoins.app/r?ac=0E9362",
        text: "$10 if you spend $100",
      },
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
      realSpread: (i) => 0.0294 * i,
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
      kyc: {
        documents: "Photo ID, selfie and proof of residence",
        processing: "0-1 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    bullbitcoin: {
      name: "Bull Bitcoin",
      url: "https://bullbitcoin.com/",
      referral: {
        url:
          "https://bullbitcoin.com/signup?referralcode=f8e3d7b364cc4f61f2277f0f42c9ed06a68982ade6",
        text: "$10 if you spend $100",
      },
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
      realSpread: (i) => 0.0207 * i,
      withdrawFee: {},
      coins: {
        BTC: true,
      },
      kyc: {
        documents: "photo ID and proof of residence",
        processing: "???",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: true,
    },
    coinsquare: {
      name: "Coinsquare",
      url: "https://coinsquare.com",
      referral: {
        url: "coinsquare.com/register?r=3lBEq",
        text: "$10 if you spend $100",
      },
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
      realSpread: (i) => 0.0208 * i,
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
      kyc: {
        documents: "Proof of residence and photo ID",
        processing: "???",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    bitbuy: {
      name: "Bitbuy",
      url: "https://bitbuy.ca/",
      referral: {
        url: "https://bitbuy.ca/sign-up?c=AU95LPPS2",
        text: "$20 if you spend $250",
      },
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
      tradingFee: (i) => 0.005 * i,
      realSpread: (i) => 0.0111 * i,
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
      kyc: {
        documents:
          "Photo ID, selfie, financial statement and proof of residence",
        processing: "Instant or 1-4 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    ndax: {
      name: "Ndax",
      url: "https://ndax.io",
      referral: {
        url: "https://one.ndax.io/bfP6NZ",
        text: "$10 if you spend $100",
      },
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
      realSpread: (i) => 0.0063 * i,
      withdrawFee: {
        BTC: 0.000399,
        ETH: 0.0099,
        LTC: 0.0499,
        XRP: 9,
        EOS: 1,
        XLM: 15,
        DOGE: 10,
        ADA: 8,
        LINK: 0.2,
        USDT: 3.5,
        DOT: 0.3,
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
      kyc: {
        documents: "Selfie, proof of residence and photo ID",
        processing: "1 business day",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: true,
    },
    mybtc: {
      name: "Mybtc",
      url: "https://mybtc.ca/",
      referral: {
        url: "",
        text: "Don't use this exchange",
      },
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
      realSpread: (i) => 0.0074 * i,
      withdrawFee: {},
      coins: {
        BTC: true,
      },
      kyc: {
        documents: "photo ID, selfie and proof of residence",
        processing: "0-1 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    coinsmart: {
      name: "Coinsmart",
      url: "https://www.coinsmart.com/",
      referral: {
        url: "https://crypto.coinsmart.com/register?promo=Ref-bP8kRb",
        text: "$15 if you spend $100",
      },
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
      realSpread: (i) => 0.022 * i,
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
      kyc: {
        documents: "photo ID, selfie and proof of residence",
        processing: "0-1 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    coinbase: {
      name: "Coinbase",
      url: "",
      referral: {
        url: "",
        text: "Don't use this exchange",
      },
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
      realSpread: (i) => 0.0078 * i,
      withdrawFee: {
        BTC: 0.00003442,
        ETH: 0.001827,
      },
      coins: {
        LOTS: true,
      },
      kyc: {
        documents: "selfie and photo ID",
        processing: "1 business day",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    kraken: {
      name: "Kraken",
      url: "https://www.kraken.com/",
      referral: {
        url: "",
        text: "nothing for you... booo....",
      },
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
      realSpread: (i) => 0.003 * i,
      withdrawFee: {
        BTC: 0.0005,
        ETH: 0.005,
      },
      coins: {
        LOTS: true,
      },
      kyc: {
        documents: "photo ID, proof of residence",
        processing: "1 business day",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    gemini: {
      name: "Gemini",
      url: "https://www.gemini.com/",
      referral: {
        url: "",
        text: "Yes but can't find it",
      },
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
      kyc: {
        documents: "proof of residence and photo ID",
        processing: "Months (started Dec 15th 2020 and still pending)",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: true,
    },
    localbitcoins: {
      name: "Localbitcoins",
      url: "https://localbitcoins.com/",
      referral: {
        url: "",
        text: "Nothing for you... booo....",
      },
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
      realSpread: (i) => 0.0491 * i,
      withdrawFee: {
        BTC: 0.00004949,
      },
      coins: {
        BTC: true,
      },
      kyc: {
        documents: "photo ID and proof of residence",
        processing: "???",
      },
      support: {
        responseTime: "2 business days",
      },
      otc: false,
      recurringBuy: false,
    },
    "crypto.com": {
      name: "Crypto.com",
      url: "https://crypto.com/exchange/",
      referral: {
        url: "https://crypto.com/app/9pv58czacq",
        text: "$25 if you stake 5000 CRO",
      },
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
      realSpread: (i) => 0.0148 * i,
      withdrawFee: {
        BTC: 0.0004,
        ETH: 0.005,
      },
      coins: {
        LOTS: true,
      },
      kyc: {
        documents: "Bank account, selfie, utility bill and photo id",
        processing: "Instant or 2-4 business days",
      },
      support: {
        responseTime: "0-1 business days",
      },
      otc: false,
      recurringBuy: false,
    },
  };

  exports.DATA = DATA;
})(typeof exports === "undefined" ? (this["exchangeData"] = {}) : exports);
