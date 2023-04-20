import * as dotenv from 'dotenv'

dotenv.config()

export const config = {
  apiKey: process.env.BINANCE_APIKEY,
  secretKey: process.env.BINANCE_SECRETKEY,
  targetWallets: ['0x39e3668D11E5d6CCe1196d182689ee1729bb4dFf'],
  token: 'ETH',
  network: 'ETH',
  amount: 0.01,
  spread: {
    // if true, the withdrawal amount will be increase for a spread percent below
    enable: true,
    // in percentage, the withdrawal amount will be increase up to this percentage.
    // eg, if percentage is 10, the withdrawal amount will be increase randomly between 100-110%.
    percentage: 10
  },
  txDelay: {
    // in seconds, the backoff delay between each withdrawal transaction
    min: 10,
    max: 30
  }
}
