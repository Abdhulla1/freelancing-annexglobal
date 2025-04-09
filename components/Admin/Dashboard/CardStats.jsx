import React from "react";
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { Chart } from "primereact/chart";

export default function CardStats({
  title,
  value,
  showAvatars = false,
  chart = false,
}) {
  const avatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
  ];

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    aspectRatio: 0,
    datasets: [
      {
        data: [3, 2, 5, 4],
        fill: true,
        borderColor: "#3b82f6",
        tension: 0.4,
        backgroundColor: "rgba(59,130,246,0.1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 7,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="card shadow rounded-4 p-4 h-100">
      <div className="d-flex flex-row justify-content-between align-items-center h-100">
        <div className="d-flex w-100 flex-row justify-content-between align-items-center ">
          <div>
            {" "}
            <h6 className="text-secondary mb-1">{title}</h6>
            <h1 className="fw-bold text-dark">{value}</h1>
          </div>

          {showAvatars && (
            <AvatarGroup className="mt-3">
              {avatars.map((url, idx) => (
                <Avatar key={idx} image={url} shape="circle" />
              ))}
              <Avatar
                label="18+"
                shape="circle"
                style={{ backgroundColor: "#E9EBF0", color: "#333" }}
              />
            </AvatarGroup>
          )}
        </div>

        {chart && (
          <div className="ms-3 " style={{ width: "150px", height: "60px" }}>
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
}
