
const BASE_URL = `https://api.coinpaprika.com/v1`;

const BASE_URL2 = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}


export function fetchCoinInfo(coinId:string){

    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}


export function fetchCoinTikers(coinId:string){

    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}


export function fetchCoinHistory(coinId:string){
    return fetch(`${BASE_URL2}?coinId=${coinId}`).then((response) => response.json());
}