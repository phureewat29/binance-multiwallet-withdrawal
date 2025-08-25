import axios from "axios";
import crypto from "node:crypto";
import { config } from "./config.js";
import _ from "lodash";

axios.defaults.baseURL = "https://api.binance.com/sapi/v1/capital";
axios.defaults.headers.common["X-MBX-APIKEY"] = config.apiKey;

const txStatuses = {
  0: "Email Sent",
  1: "Cancelled",
  2: "Awaiting Approval",
  3: "Rejected",
  4: "Processing",
  5: "Failure",
  6: "Completed",
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sign = (queryString) =>
  crypto
    .createHmac("sha256", config.secretKey)
    .update(queryString)
    .digest("hex");
const calculateSpreadAmount = (decimal) =>
  (config.amount * _.random(1, 1 + config.spread.percentage / 100)).toFixed(
    decimal
  );

const getCoinInformation = async (coin) => {
  const query = `timestamp=${Date.now()}`;
  const signature = sign(query);

  const res = await axios
    .get(`/config/getall?${query}&signature=${signature}`)
    .catch((err) => console.error(err.response.data.msg));

  return res.data.find((query) => query.coin === coin);
};

const getTransactionInfo = async (coin, txid) => {
  const query = `coin=${coin}&timestamp=${Date.now()}`;
  const signature = sign(query);

  const res = await axios
    .get(`/withdraw/history?${query}&signature=${signature}`)
    .catch((err) => console.error(err.response.data.msg));

  const tx = res.data.find((query) => query.id === txid);
  console.log(
    `tx sent ${tx.amount} ${tx.coin}, fee: ${tx.transactionFee} ${
      tx.coin
    }, status: ${txStatuses[tx.status]}, txid: ${tx.txId}`
  );

  return res.data;
};

const withdraw = async (coin, address, amount, network) => {
  const query = `coin=${coin}&address=${address}&amount=${amount}&network=${network}&timestamp=${Date.now()}`;
  const signature = sign(query);

  const res = await axios
    .post(`/withdraw/apply?${query}&signature=${signature}`)
    .catch((err) => console.error(err.response.data.msg));

  const delaySeconds = _.random(config.txDelay.min, config.txDelay.max);
  console.log(`delay ${delaySeconds} seconds`);
  await delay(delaySeconds * 1000);
  await getTransactionInfo(coin, res.data.id);
  return res;
};

const exactTransfer = async () => {
  for (const [address, amount] of _.entries(config.exactTargetWallets)) {
    console.log(
      `withdraw: ${amount} ${config.token}, on ${config.network}, to ${address}`
    );
    await withdraw(config.token, address, amount, config.network);
  }
};

const spreadTransfer = async (decimals) => {
  for (const address of config.spreadTargetWallets) {
    const amount = config.spread.enable
      ? calculateSpreadAmount(decimals)
      : config.amount;
    console.log(
      `withdraw: ${amount} ${config.token}, on ${config.network}, to ${address}`
    );
    await withdraw(config.token, address, amount, config.network);
  }
};

(async () => {
  const coinData = await getCoinInformation(config.token);
  const { withdrawIntegerMultiple } = coinData.networkList.find(
    (item) => item.network === config.network
  );
  const decimals =
    withdrawIntegerMultiple.length > 1
      ? withdrawIntegerMultiple.split(".")[1].length
      : 0;
  console.log(`account balance: ${coinData.free} ${coinData.coin}`);
  console.log(`transfer mode: ${config.transferMode}`);

  if (config.transferMode === "exact") {
    await exactTransfer();
  } else if (config.transferMode === "spread") {
    await spreadTransfer(decimals);
  }
})();
