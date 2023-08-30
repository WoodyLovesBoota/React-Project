import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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

interface IChartProps {
  coinId: string;
}

const Chart = () => {
  const { coinId } = useOutletContext<IChartProps>();
  const { isLoading, data } = useQuery<IHistoricalData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{ name: "price", data: data?.map((price) => parseFloat(price.close)) ?? [] }]}
          options={{
            chart: {
              height: 300,
              width: 400,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: "dark" },
            title: {
              text: "Line Chart",
              align: "left",
            },
            stroke: { curve: "smooth" },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#D5FFE4", "#8BE8E5", "#A084E8"],
              },
            },
            colors: ["#6F61C0"],
            tooltip: { y: { formatter: (value) => `${value.toFixed(3)}` } },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
