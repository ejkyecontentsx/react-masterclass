import React from "react";
import { useQuery } from "react-query";
import { fetchCoinTikers } from "../api.ts";
import styled from "styled-components";


const Grid3 = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 25px 0px;
    gap: 10px;
    
`

const Grid2 = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap: 10px;
    
`

const DigitDiv = styled.div`
    text-align: right;
`

const RowDiv = styled.div`
    margin-top: 10px;
    display: block;
`

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }


  interface PriceProps{
    coinId : string;
  }

function Price({coinId}:PriceProps){
    const {isLoading:tickerLoading, data:tickerData} = useQuery<PriceData>(["tickers",coinId], ()=> fetchCoinTikers(coinId));
    return <>
    <Grid2>
        <div>current price :</div><DigitDiv>{tickerData?.quotes.USD.price}</DigitDiv>
        <div>valume 24h :</div><DigitDiv>{tickerData?.quotes.USD.volume_24h}</DigitDiv>
        <div>market cap :</div><DigitDiv>{tickerData?.quotes.USD.market_cap}</DigitDiv>
    </Grid2>
  
    <Grid3>
    <div>change in</div>
    <div>
        1h<br/>
        24h<br/>
        30 days<br/>
        1 year
    </div>
    <DigitDiv >
    {tickerData?.quotes.USD.percent_change_1h}%<br/>
    {tickerData?.quotes.USD.percent_change_24h}%<br/>
    {tickerData?.quotes.USD.percent_change_30d}%<br/>
    {tickerData?.quotes.USD.percent_change_1y}%
    </DigitDiv>

    </Grid3>
    </>
}

export default Price;