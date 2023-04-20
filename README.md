# Binance Multiwallet Withdrawal

A Nodejs script to withdraw asset from the Binance account into multiple wallets. This script can be useful for participating in retro-airdrops.

## Disclaimer

This script has many checks for invalid input and other errors. Use at your own risk. The author is not responsible for any loss of funds.

## Setup

1. Binance -> Settings -> API Management -> Create API.
2. Copy API key and Secret key to `.env` file.
4. Edit restrictions -> Restrict access to trusted IPs only -> Input your IP address.
6. Сheck the box next to the _Enable Withdrawals_.
7. Config the coin, network, amount and specify the wallet addresses in `src/config.js`

## Run

```
npm install
npm start
```
