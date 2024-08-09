import { wait } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price.tsx";
import Chart from "./Chart.tsx";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTikers } from "../api.ts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms.ts";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
  height  : 15vh;
  display: block;
  text-align: center;
  padding: 30px;

`;

const Title = styled.h1`
  align-content: center;
    font-size: 48px;
    color:${props => props.theme.accentColor};
`;


const Loader = styled.span`
    text-align: center;
    display: block;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;


const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap: 10px;
`

const Tab = styled.span`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.5);
    padding: 7px 0px;
    border-radius: 10px;
    a {
        display: block;
    }
`





interface RouteParams {
    coinId : string;
}

interface RouteState {
    name : string
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  
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
  const Label = styled.label `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

const CheckBox = styled.input`
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid gray;
  border-radius: 1.25em;
  width: 2.25em;
  height: 1.25em;
  
  &:before{
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 250ms linear;
  }

  &:checked{
    background-color: rgba(0,0,0,0.5);
    border-color: rgba(0,0,0,0.5);
  }
  &:checked::before{
    background-color: white;
    left: 1em;
  }

  &:focus-visible{
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid rgba(0,0,0,0.5);
  }

  &:enabled:hover{
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }


`




function Coin(){

    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();

    const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info",coinId], ()=> fetchCoinInfo(coinId));
    const {isLoading:tickerLoading, data:tickerData} = useQuery<PriceData>(["tickers",coinId], ()=> fetchCoinTikers(coinId));

    const toggleDark = useSetRecoilState(isDarkAtom);
    const toggleDarkClick = () =>{ toggleDark((prev)=>!prev); };
    const isDark = useRecoilValue(isDarkAtom);


    // const [loading, setLoading] = useState(true);

    // const [info, setInfo] = useState<InfoData>();
    // const [priceInfo, setPriceInfo] = useState<PriceData>();

    // useEffect(()=>{
    //     (async()=>{
    //         const response= await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    //         const infoData = await response.json();

    //         const response2 = await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
    //         const priceData = await response2.json();

    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();

    // }, [coinId]);

    const loading = infoLoading || tickerLoading;

    return <Container>
      
    <Header>
    
      <Title>
{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
      </Title>
      <Tabs>
      <div><Link to={`/`} >Back to Coin  List</Link></div>
      <Label>
                <CheckBox role="switch" type="checkbox" onClick={toggleDarkClick} checked={isDark} />
                <span>Dark Mode</span>
            </Label>
      </Tabs>
      
    </Header>
    {loading ? (
      <Loader>Loading...</Loader>
    ) : (
      <>
        <Overview>
          <OverviewItem>
            <span>Rank:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Price:</span> 
            <span>${tickerData?.quotes.USD.price.toFixed(3)}</span>
          </OverviewItem>
        </Overview>
        <Description>{infoData?.description}</Description>
        <Overview>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{tickerData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{tickerData?.max_supply}</span>
          </OverviewItem>
        </Overview>

        <Tabs>
            <Tab>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab>
                <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
        </Tabs>

        <Switch>
          <Route path={`/${coinId}/price`}>
            <Price coinId={coinId}/>
          </Route>
          <Route path={`/${coinId}/chart`}>
            <Chart coinId={coinId} />
          </Route>
        </Switch>
      </>
    )}
  </Container>
}

export default Coin;