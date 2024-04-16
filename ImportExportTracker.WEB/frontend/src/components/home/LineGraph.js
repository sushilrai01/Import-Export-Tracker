import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import apiUrl from "../../common/app-url";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineGraph = () => {
  const options = {};
  const [fiscalYear, setFiscalYear] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl.apiSelectUrl.getFiscalYear)
      .then((response) => {
        console.log(response.data);

        const fiscalYears = response.data;
        setFiscalYear(fiscalYears);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Steps",
        data: [5000, 1000, 6000, 3000, 4000, 7000, 9000, 8000],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
