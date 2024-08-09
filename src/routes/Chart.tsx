import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api.ts";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms.ts";
import styled from "styled-components";

interface ChartProps{
    coinId : string
}
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const PrettyButton = styled.button`
   background-color: #f0f0f0;
            border: 2px solid #ccc;
            border-radius: 5px;
            color: #333;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
&:hover{
  background-color: #e0e0e0;
            color: #000;
}
    
`



function Chart({coinId}:ChartProps){

    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv",coinId], ()=> fetchCoinHistory(coinId));
    const isDark = useRecoilValue(isDarkAtom);
    const [isLineChart, setLineChart] = useState<boolean>(true);

    const onClickChartType = () =>{ setLineChart(!isLineChart) };

    return <div> <PrettyButton onClick={onClickChartType}> {isLineChart ? "Candle Chart" : "Line Chart" }</PrettyButton>
        {isLoading ? ("Loading Chart" ) 
        : isLineChart ? ( <ApexChart type="line" series={[
            {   name:"Price",
                data: data?.map((price)=> price.close) as number[], 
            }

        ]} options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }} /> ) : ( <ApexChart type="candlestick" 
            series={[
              { data:data?.map((price) => [price.time_close, price.open, price.high, price.low, price.close] ) as number[][] }
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
            }}

          />)
    
    }
        </div>
}

export default Chart;