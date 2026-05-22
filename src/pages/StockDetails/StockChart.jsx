import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertToUnixTimestamp } from "./ConvertToChartData";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];
const StockChart = ({ coinId }) => {
  const [stockData, setStockData] = useState(null);
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const [loading, setLoading] = useState(false);
  const { coin,auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  // Retrieve user's selected accent theme from settings
  const accentColor = localStorage.getItem("settings-accent") || "green";
  const getAccentHexColor = () => {
    if (accentColor === "cyan") return "#06b6d4";
    if (accentColor === "purple") return "#8b5cf6";
    if (accentColor === "orange") return "#f97316";
    return "#10b981"; // Sage Green default
  };

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false, // Premium, clutter-free look
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#8892b0",
          fontFamily: "Hanken Grotesk, sans-serif"
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          if (value === null || value === undefined) return "";
          if (value >= 1e9) {
            return (value / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
          }
          if (value >= 1e6) {
            return (value / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
          }
          if (value >= 1e3) {
            return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
          }
          if (value >= 1) {
            return value.toFixed(2).replace(/\.00$/, "");
          }
          return value.toFixed(4); // Keep precision for micro-cap altcoins
        },
        style: {
          colors: "#8892b0",
          fontFamily: "Hanken Grotesk, sans-serif"
        }
      }
    },
    colors: [getAccentHexColor()], // Dynamic accent themed line!
    markers: {
      size: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy HH:mm"
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05, // Modern, clean fade
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "rgba(132, 149, 136, 0.15)", // Premium soft responsive outline
      strokeDashArray: 4,
      show: true,
    },
  };

  useEffect(() => {
    // const fetchStockData = async () => {
    //   setLoading(true);
    //   setStockData(null)
    //   const data = await fetchData(activeType.keyword, coinId );
    //   console.log("stock data ", data);
    //   const chartData = convertToUnixTimestamp(data[activeType.key]);
    //   console.log("chartData ", chartData);
    //   setStockData(chartData);
    //   setLoading(false);
    // };
    // fetchStockData();
    if (coinId) {
      dispatch(fetchMarketChart({ coinId, days: activeType.value,jwt:localStorage.getItem("jwt") || auth.jwt }));
    }
  }, [coinId,activeType.value]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("coin reducer", coin);

  return (
    <div>
      <div id="charts">
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)}
              key={item.lable}
              variant={activeType.lable !== item.lable ? "outline" : ""}
            >
              {item.lable}
            </Button>
          ))}
        </div>
        <div id="chart-timelines">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={450}
          />
        </div>
      </div>
      {/* <div id="html-dist"></div> */}
    </div>
  );
};

export default StockChart;
