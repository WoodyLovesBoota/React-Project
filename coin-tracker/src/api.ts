import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1/";
const NEXT_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export const fetchCoins = async () => {
  return await axios.get(`${BASE_URL}coins`).then((res) => res.data);
};

export const fetchCoinInfo = async (coinId: string | undefined) => {
  return await axios.get(`${BASE_URL}coins/${coinId}`).then((res) => res.data);
};

export const fetchCoinPriceInfo = async (coinId: string | undefined) => {
  return await axios.get(`${BASE_URL}tickers/${coinId}`).then((res) => res.data);
};

export const fetchCoinHistory = async (coinId: string | undefined) => {
  return await axios.get(`${NEXT_URL}?coinId=${coinId}`).then((res) => res.data);
};
