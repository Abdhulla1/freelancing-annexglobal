import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import 'chart.js/auto';

export default function VenueBookingsChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
      datasets: [
        {
          label: "Room Availability",
          backgroundColor: "#4CBF8B", // soft green
          borderRadius: 4,
          data: [10, 9, 8, 10, 12, 12, 12],
          barPercentage: 0.5,
        },
        {
          label: "Booked Slots",
          backgroundColor: "#FFD326", // yellow
          borderRadius: 10,
          data: [12, 11, 14, 11, 15, 15, 15],
          barPercentage: 0.5,
        },
      ],
    };

    const options = {
      responsive: true,
      aspectRatio: 1.2,
      maintainAspectRatio: false,
  
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: false,
          ticks: {
            color: "#A0AEC0",
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
            color: "#A0AEC0",
          },
          grid: {
            color: "#EDF2F7",
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="bg-white rounded-4 p-3">
      <h4 className="fw-bold mb-3 event-heading">
        Venue Bookings
      </h4>

      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        style={{ marginTop: "20px" }}
      />

      <div className="d-flex justify-content-around align-items-center mt-3">
        <div className="d-flex align-items-center justify-content-start gap-2 ">
          <div className="bg-success bg-opacity-10 text-success rounded-3 p-2 d-flex align-items-center justify-content-center">
            <i className={`bx bxs-castle `} style={{ fontSize: "1.5rem"}}></i>
          </div>
          <div>
            <strong className="event-heading"> Room Availability</strong>
            <div style={{ fontSize: "0.8rem", color: "#737791" }}>Global</div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
        <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-2 d-flex align-items-center justify-content-center">
            <i className={`bx bxs-castle `} style={{ fontSize: "1.5rem"}}></i>
          </div>
          <div>
            <strong className="event-heading">Booked Slots</strong>
            <div style={{ fontSize: "0.8rem", color: "#718096" }}>
              Commercial
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
