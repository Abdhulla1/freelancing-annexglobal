import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import 'chart.js/auto';

export default function ConferenceConductedChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Last 6 Month",
          data: [12, 19, 3, 5, 2, 10],
          borderColor: "#007bff", // Bootstrap primary blue
          backgroundColor: "rgba(0,123,255,0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#007bff",
        },
        {
          label: "Next 6 Month",
          data: [15, 13, 14, 20, 16, 22],
          borderColor: "#28a745", // Bootstrap success green
          backgroundColor: "rgba(40,167,69,0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#28a745",
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      animation: false,
      aspectRatio: 1.2,
      plugins: {
        legend: {
          display: false, // hide default legend
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
            color: "#6c757d", // Bootstrap secondary
          },
          grid: {
            color: "#dee2e6", // Bootstrap light gray
          },
        },
        x: {
          ticks: {
            color: "#6c757d",
          },
          grid: {
            color: "#f8f9fa", // very light
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="bg-white rounded-4 p-3">
      <h5 className="fw-bold mb-3 event-heading">Conferences Conducted</h5>
        <Chart type="line" data={chartData} options={chartOptions}  style={{ marginTop: "20px" }} />

      <div className="d-flex justify-content-around align-items-center mt-3">
        <div className="d-flex flex-column  justify-content-center align-items-center gap-2">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <span className="rounded-circle d-inline-block" style={{ width: "12px", height: "12px", backgroundColor: "#007bff" }}></span>
          <span className="text-muted">Last 6 Month</span>
          </div>
          <h6 className="fw-bold">12</h6>

        </div>
        &nbsp; | &nbsp;
        <div className="d-flex flex-column justify-content-center  align-items-center gap-2">
            <div className="d-flex justify-content-center align-items-center gap-2">
            <span className="rounded-circle d-inline-block" style={{ width: "12px", height: "12px", backgroundColor: "#28a745" }}></span>
            <span className="text-muted">Next 6 Month</span>
            </div>
          <h6 className="fw-bold">22</h6>
        </div>
      </div>

    </div>
  );
}
