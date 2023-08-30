import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IPriceProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Price = () => {
  const { coinId } = useOutletContext<IPriceProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: new Date(price.time_open),
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 300,
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: "dark" },
            stroke: { curve: "smooth" },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
            },
          }}
        />
      )}
    </div>
  );
};

export default Price;
