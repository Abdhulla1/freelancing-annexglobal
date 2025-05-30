"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "chart.js/auto";

export default function ConferenceConductedChart({ conferencesConducted }) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (!conferencesConducted) return;

    const documentStyle = getComputedStyle(document.documentElement);

    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const lastMonthCounts = Array(6).fill(0);
    const nextMonthCounts = Array(6).fill(0);

    const now = new Date();

    const countByMonth = (conferences, isFuture = false) => {
      conferences.forEach((conf) => {
        const dateStr = conf?.conference?.landingPage?.endDate;
        if (dateStr) {
          const date = new Date(dateStr);
          const diffMonths =
            (date.getFullYear() - now.getFullYear()) * 12 +
            (date.getMonth() - now.getMonth());
          const idx = isFuture ? diffMonths : 5 - Math.abs(diffMonths);
          if (idx >= 0 && idx < 6) {
            if (isFuture) nextMonthCounts[idx] += 1;
            else lastMonthCounts[idx] += 1;
          }
        }
      });
    };

    countByMonth(conferencesConducted.lastConferences || [], false);
    countByMonth(conferencesConducted.nextConferences || [], true);

    const data = {
      labels: allMonths,
      datasets: [
        {
          label: "Last 6 Months",
          data: lastMonthCounts,
          borderColor: "#007bff",
          backgroundColor: "rgba(0,123,255,0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#007bff",
        },
        {
          label: "Next 6 Months",
          data: nextMonthCounts,
          borderColor: "#28a745",
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
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#6c757d",
          },
          grid: {
            color: "#dee2e6",
          },
        },
        x: {
          ticks: {
            color: "#6c757d",
          },
          grid: {
            color: "#f8f9fa",
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [conferencesConducted]);

  return (
    <div className="bg-white rounded-4 p-3">
      <h5 className="fw-bold mb-3 event-heading">Conferences Conducted</h5>
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        style={{ marginTop: "20px" }}
      />

      <div className="d-flex justify-content-around align-items-center mt-3">
        <div className="d-flex flex-column  justify-content-center align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <span
              className="rounded-circle d-inline-block"
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#007bff",
              }}
            ></span>
            <span className="text-muted">Last 6 Month</span>
          </div>
          <h6 className="fw-bold">
            {conferencesConducted?.lastConferencesCount || 0}
          </h6>
        </div>
        &nbsp; | &nbsp;
        <div className="d-flex flex-column justify-content-center  align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center gap-2">
            <span
              className="rounded-circle d-inline-block"
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: "#28a745",
              }}
            ></span>
            <span className="text-muted">Next 6 Month</span>
          </div>
          <h6 className="fw-bold">
            {conferencesConducted?.nextConferencesCount || 0}
          </h6>{" "}
        </div>
      </div>
    </div>
  );
}
