"use client";
import React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CountdownBanner.module.css";

const CountdownBanner = ({conferenceId}) => {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("2025-06-01T00:00:00");
      const now = new Date();
      const difference = eventDate - now;

      return {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    };

    setTimeLeft(calculateTimeLeft()); // Set initial value

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className={`fixed-bottom  ${styles.banner}`}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center">
        <h5 className="text-dark m-0 fw-bold">EVENT STARTS IN:</h5>

        <div className="d-flex gap-3 flex-wrap justify-content-center align-items-center">
  {["days", "hours", "minutes", "seconds"].map((unit, index, array) => (
    <React.Fragment key={unit}>
      <div className={`text-center ${styles.timeBox}`}>
        <span className={`d-block  fw-bold ${styles.time}`}>{timeLeft[unit]}</span>
        <span className="small text-uppercase">{unit}</span>
      </div>
      {index < array.length - 1 && (
        <span className={`fw-bold fs-3 ${styles.colon}`}>:</span>
      )}
    </React.Fragment>
  ))}
</div>

<div className="d-flex gap-2">
 <Link href={ `/conference/${conferenceId}/registration`} className="mt-2 mt-md-0">
          <button className={` fw-bold text-uppercase ${styles.brochure}`}>
            brochure
          </button>
        </Link>
        <Link href={ `/conference/${conferenceId}/registration`} className="mt-2 mt-md-0">
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
