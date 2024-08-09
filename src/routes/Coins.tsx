import React, {useEffect, useState} from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api.ts";
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
`;

const ColinList = styled.ul`
    
`;


const Coin = styled.li`
    background-color:${(props=>props.theme.textColor)};
    color: ${(props=>props.theme.bgColor)};
    border-radius: 15px;
    margin-bottom: 10px;

    a{
        padding:20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover {
        a{
            color: ${(props)=>props.theme.accentColor};
        }
    }
`;




const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor};
    padding: 30px;

`;

const Loader = styled.span`
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`

interface CoinInterface {
    id:string;
    name:string;
    rank:number;
    is_new:boolean;
    is_acive:boolean;
    type:string;
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


function Coins(){


    const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins);
    const toggleDark = useSetRecoilState(isDarkAtom);
    const isDark = useRecoilValue(isDarkAtom);
    const toggleDarkClick = () =>{ toggleDark((prev)=>!prev); };


    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     (async () => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // }, []);

    return <Container>
        <Header>
            <Title>Coins</Title>
            <Label>
                <CheckBox role="switch" type="checkbox" onClick={toggleDarkClick} checked = {isDark} />
                <span>Dark Mode</span>
            </Label>
        </Header>

        {isLoading? (
            <Loader>Loading...</Loader>
        ):(        
            <ColinList>
                {
                    data?.slice(0,100).map((coin) =>(
                        <Coin key={coin.id}>
                            <Link to={
                                        {
                                            pathname: `/${coin.id}`,
                                            state: {name: coin.name}
                                        }
                                    }>
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>{coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))
                }
            </ColinList>
        
        )}

    </Container>;
}

export default Coins;