"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./Dashboard.module.css";
import { Chart } from "primereact/chart";
import ConferenceConductedChart from "./Chart/ConferenceConductedChart";
import VenueBookingsChart from "./Chart/VenueBookingsChart";
import CardStats from "./CardStats";
import { Toast } from "primereact/toast";
import "chart.js/auto";
import { getAdminDashboardData } from "@/service/adminDashboard";
import { ProgressSpinner } from "primereact/progressspinner";

const events = [
  {
    title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    date: "17 Mar 2026",
    location: "Dubai, UAE",
  },
  {
    title: "International Conference Global Healthcare",
    date: "20 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Pediatrics And Neonatology",
    date: "28 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    date: "27 Jul 2026",
    location: "Dubai, UAE",
  },
  {
    title: "International Conference Global Healthcare",
    date: "20 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Pediatrics And Neonatology",
    date: "28 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    date: "27 Jul 2026",
    location: "Dubai, UAE",
  },
];
const pastevents = [
  {
    title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    date: "27 Jul 2026",
    location: "Dubai, UAE",
  },
  {
    title: "International Conference Global Healthcare",
    date: "20 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Pediatrics And Neonatology",
    date: "28 Jun 2026",
    location: "Dubai, UAE",
  },
  {
    title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    date: "27 Jul 2026",
    location: "Dubai, UAE",
  },
];
export default function Dashboard() {
  const [tab, setTab] = useState("upcoming");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const toast = useRef(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAdminDashboardData();
        setDashboardData(res.data.detail);
      
      } catch (err) {
         setError(err);
        const errorMsg = typeof err === "string" ? err : "Failed to load data";
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: errorMsg,
    
        });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "First Dataset",
          data: [0, 292, 303, 111, 216, 252, 120, 351, 292, 303, 111, 216],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
            stepSize: 100, // increment by 100
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="container">
      <Toast ref={toast} />
   {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="5"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      ) : !dashboardData ? (
        <div className="p-4">
          <div className="alert alert-danger text-center" role="alert">
            {error ? error : "No data available"}
          </div>
        </div>
      ) : (
        <>
             <div className="row gap-3 justify-content-center">
        <div className=" bg-black  col-12 col-md-7 p-3 rounded-4 bg-white">
          <div className="d-flex justify-content-between">
            <h4 className={`fw-bold d-inline event-heading`}>Events</h4>

            <div className="d-inline-flex border-bottom mb-3">
              <div
                className={`cursor-pointer  ${
                  tab === "upcoming"
                    ? "text-warning border-bottom border-warning"
                    : "text-secondary"
                } ${style["tab-btn"]}`}
                onClick={() => setTab("upcoming")}
              >
                Upcoming Event
              </div>
              <span
                className={`cursor-pointer ms-3 ${
                  tab === "past"
                    ? "text-warning border-bottom border-warning"
                    : "text-secondary"
                } ${style["tab-btn"]}`}
                onClick={() => setTab("past")}
              >
                Past Event
              </span>
            </div>
          </div>
          <div
            className={`overflow-auto p-3 ${style["events"]}`}
            style={{ maxHeight: "300px" }}
          >
            {(tab === "upcoming" ? events : pastevents).map((event, index) => (
              <div
                className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom"
                key={index}
              >
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-3 d-flex align-items-center justify-content-center">
                  <i className={`bx bxs-calendar  ${style["event-icon"]}`}></i>
                </div>
                <div>
                  <h6 className={` d-inline ${style["event-title"]}`}>
                    {event.title}
                  </h6>
                  <small className="text-muted">
                    &nbsp; | {event.date} &nbsp; | &nbsp; {event.location}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-4 p-3  rounded-4 bg-white ">
          <h4 className={`fw-bold d-inline mb-5 event-heading`}>
            website visitor
          </h4>
          <Chart
            type="line"
            data={chartData}
            options={chartOptions}
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
      <div className="row gap-2 mt-3 justify-content-center">
        <div className="col-12 col-md-7 p-3  rounded-4 bg-white ">
          <ConferenceConductedChart />
        </div>
        <div className="col-12 col-md-4 p-3  rounded-4 bg-white ">
          <VenueBookingsChart />
        </div>
        <div className="col-12 p-3  rounded-4 bg-white ">
          <div className="row gap-4 justify-content-center ">
            <div className="col-md-6 col-lg-5">
              <CardStats title="Total Speakers" value={dashboardData.ocm.counts} showAvatars />
            </div>
            <div className="col-md-6 col-lg-5">
              <CardStats title="Total OCM" value={dashboardData.speakers.counts} showAvatars />
            </div>
            {/* <div className="col-md-6 col-lg-5">
              <CardStats title="Total Conference" value={dashboardData.conferences} chart />
            </div>
            <div className="col-md-6 col-lg-5">
              <CardStats title="Total Webinar" value={dashboardData.webinar} chart />
            </div> */}
          </div>
        </div>
      </div>
        </>
      )}
  
    </div>
  );
}
