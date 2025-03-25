'use client';
import React, { useState, useEffect } from "react";
import BroucherGridStyles from "./BroucherGrid.module.css";

const BroucherGrid = () => {
  const events = [
    {
      id: 1,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "Annual Congress On Gynecology, Obstetrics And Women's Health",
    },
    {
      id: 2,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "International Conference on AI & Machine Learning",
    },
    {
      id: 3,
      image: "/images/conferences/dubai-city.webp",
      date: "17 Mar 2026",
      title: "World Summit on Data Science & Cybersecurity",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Track the active event
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  // Auto-slide every 3 seconds if nothing is hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, events.length]);

  return (
    <div className={BroucherGridStyles["container"]}>
      <div className="container py-5">
        <div className="d-block d-md-flex align-items-center justify-content-between">
          <div>
            <h4>Dubai: Oasis Of Opportunity In The Desert Sands</h4>
            <div className="col-12 col-md-6">
              <p className="text-muted">
                Dubai, A Charming City In The UAE, Skillfully Combines
                Contemporary And Heritage. For The World's Tallest Structure, The
                Burj Khalifa, Dubai Offers Contemporary Experiences.
              </p>
            </div>
          </div>
          <div className={BroucherGridStyles["btn-container"]}>
            <button className={`btn ${BroucherGridStyles["btn-download"]}`}>
              Download Broucher
            </button>
          </div>
        </div>

        {/* Event Cards as a Slider */}
        <div className="mt-3 row">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={
                index === activeIndex
                  ? "col-md-12 col-lg-6" // Expand active card
                  : "col-md-6 mt-3 mt-lg-0 col-lg-3" // Normal size for others
              }
              onMouseEnter={() => {
                setActiveIndex(index);
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <div className={BroucherGridStyles["card"]}>
                <img src={event.image} alt="Event Image" />
                <div className={BroucherGridStyles["date-badge"]}>
                  {event.date}
                </div>
                <div className={BroucherGridStyles["overlay"]}>
                  <div className={index === 0 ? BroucherGridStyles["title"] : BroucherGridStyles["title2"]}>
                    {event.title}
                  </div>
                  <button className={BroucherGridStyles["register-btn"]}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroucherGrid;
