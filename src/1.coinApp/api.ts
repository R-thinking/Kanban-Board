import { Interface } from 'readline'

const BASE_URL = 'https://api.coincap.io/v2'

export function fetchCoins() {
  return fetch(`${BASE_URL}/assets`).then((response) => response.json().then((data) => data.data))
}

export function fetchCoinInfo(coinID: string) {
  return fetch(`${BASE_URL}/assets/${coinID}`).then((response) => response.json().then((data) => data.data))
}

/* export function fetchCoinMetadata(coinID: string) {
  return fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${coinID}`).then((response) => console.log(response))
} */

export function fetchCoinHistory(coinID: string, period: string) {
  return fetch(`${BASE_URL}/assets/${coinID}/history?interval=${period}`).then((response) => response.json().then((data) => data.data))
}
