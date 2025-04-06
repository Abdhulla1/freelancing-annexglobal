"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CountdownBanner.module.css";

const CountdownBanner = () => {
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
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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

        <div className="d-flex gap-3 flex-wrap justify-content-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className={`text-center ${styles.timeBox}`}>
              <span className={`d-block fw-bold ${styles.time}`}>{timeLeft[unit]}</span>
              <span className="small text-uppercase">{unit}</span>
            </div>
          ))}
        </div>

        <Link href="/tickets" className="mt-2 mt-md-0">
          <button className={`btn btn-dark ${styles.ticketBtn}`}>
            GET TICKET <img src="/icons/arrow-circle-up.png" alt="Arrow Icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CountdownBanner;
