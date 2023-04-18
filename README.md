# Binance Multiwallet Withdrawal
This script allows you to withdraw coins from the binance balance to multiple wallets. The bot supports all binance coins and all networks. Will be useful for participating in retrodrops and other types of abuse. This bot able to send random amounts to avoid linking wallets, check for invalid wallets, send with random delay.

## Before Start
This script has many checks for invalid input and other errors. However, use at your own risk. The author is not responsible for any loss of funds.

## Get Binance API key

1) Binance -> Settings -> API Management -> Create API.
2) Copy API key and Secret key to `config.js` file.
3) Edit restrictions -> Restrict access to trusted IPs only -> Input your IP address.
4) Сheck the box next to the _Enable Withdrawals_.

## Run
```
npm i
npm start
```