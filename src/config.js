import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  apiKey: process.env.BINANCE_APIKEY,
  secretKey: process.env.BINANCE_SECRETKEY,

  // Transfer mode: 'spread' or 'exact'
  // 'spread': uses targetWallets with amount/spread settings
  // 'exact': uses exactTransfers with specific amounts per wallet
  transferMode: process.env.TRANSFER_MODE,

  // For spread mode: list of wallet addresses to receive spread amounts
  spreadTargetWallets: [],

  // For exact mode: object mapping wallet addresses to exact amounts
  exactTargetWallets: {},

  token: "SOL",
  network: "SOL",
  amount: 0.01,
  spread: {
    // if true, the withdrawal amount will be increase for a spread percent below
    enable: true,
    // in percentage, the withdrawal amount will be increase up to this percentage.
    // eg, if percentage is 10, the withdrawal amount will be increase randomly between 100-110%.
    percentage: 10,
  },
  txDelay: {
    // in seconds, the backoff delay between each withdrawal transaction
    min: 10,
    max: 30,
  },
};
