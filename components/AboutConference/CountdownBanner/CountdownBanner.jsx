"use client";
import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CountdownBanner.module.css";

const CountdownBanner = ({conference}) => {
const conferenceTiming = conference?.conference?.landingPage;
const startDate = conferenceTiming?.startDate;
const startTime = conferenceTiming?.startTime;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    Hrs: 0,
    Mins: 0,
    Secs: 0,
  });

useEffect(() => {
  if (!startDate || !startTime) return;

  const calculateTimeLeft = () => {
    const eventDate = new Date(`${startDate}T${startTime}`);
    const now = new Date();
    const difference = eventDate - now;

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
      Hrs: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
      Mins: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
      Secs: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
  };

  setTimeLeft(calculateTimeLeft()); // Set initial value

  const timer = setInterval(() => {
    setTimeLeft(calculateTimeLeft());
  }, 1000);

  return () => clearInterval(timer);
}, [startDate, startTime]);


  if (!timeLeft) return null;

  return (
    <div className={`fixed-bottom  ${styles.banner}`}>
      <div className="container d-flex flex-column flex-lg-row  justify-content-between align-items-center text-center">
        <h5 className="text-dark m-0 fw-bold">EVENT STARTS IN:</h5>

        <div className="d-flex gap-3 flex-wrap justify-content-center align-items-center">
  {["days", "Hrs", "Mins", "Secs"].map((unit, index, array) => (
    <React.Fragment key={unit}>
      <div className={`text-center d-flex align-items-center gap-2 ${styles.timeBox}`}>
        <span className={` fw-bold ${styles.time}`}>{timeLeft[unit]}</span>
        <span className="small text-center">{unit}</span>
      </div>
      {index < array.length - 1 && (
        <span className={`fw-bold fs-3 ${styles.colon}`}>:</span>
      )}
    </React.Fragment>
  ))}
</div>

<div className="d-flex gap-2">
 <Link href={`/conference/${conference._id}/download-brochure`} className="mt-2">
          <button className={` fw-bold text-uppercase ${styles.brochure}`}>
            brochure
          </button>
        </Link>
        <Link href={ `/conference/${conference._id}/registration`} className="mt-2 ">
          <button className={`fw-bold ${styles.ticketBtn}`}>
            GET TICKET <img src="/icons/arrow-circle-up.png" alt="Arrow Icon" />
          </button>
        </Link>
</div>
       
      </div>
    </div>
  );
};

export default CountdownBanner;
