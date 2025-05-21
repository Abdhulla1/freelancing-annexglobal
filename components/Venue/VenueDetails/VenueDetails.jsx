"use client";
import React, { useState } from "react";
import ConferenceDetailsStyles from "./VenueDetails.module.css";
import Image from "next/image";

const VenueDetails = ({ conference }) => {
  const initialImages = [
    "/images/conferences/past-conference.webp", // Replace with actual image paths
    "/images/conferences/image.png",
    "/images/conferences/past-conference.webp", // Replace with actual image paths
    "/images/conferences/image.png",
    "/images/conferences/past-conference.webp", // Replace with actual image paths
    "/images/conferences/image.png",
  ];

  const [images, setImages] = useState(initialImages);
  const [currentIndex, setCurrentIndex] = useState(1); 
  const handleNext = () => {
    if (currentIndex < images.length) {
      setImages((prevImages) => [...prevImages.slice(1), prevImages[0]]);
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 1) {
      setImages((prevImages) => [
        prevImages[prevImages.length - 1],
        ...prevImages.slice(0, prevImages.length - 1),
      ]);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={`mb-4 ${ConferenceDetailsStyles.container}`}>
      <div className="row g-0 h-100 overflow-x-hidden">
        {/* Left Section with Text & Navigatio
        n */}
        <div
          className={`col-md-12 col-lg-4 col-xl-5 ml-6 mx-auto order-2 order-lg-1  d-flex justify-content-center align-items-end  ${ConferenceDetailsStyles.leftPanel}`}
        >
          <div className=" w-100 d-flex mt-3 coll align-items-center px-2 ">
            <button
              onClick={handlePrev}
              className={`${ConferenceDetailsStyles.navButton} me-2`}
            >
              <i className="pi pi-chevron-left"></i>
            </button>
            <button
              onClick={handleNext}
              className={ConferenceDetailsStyles.navButton}
            >
              <i className="pi pi-chevron-right"></i>
            </button>

            <div className={ConferenceDetailsStyles.line}></div>
            <span className={ConferenceDetailsStyles.slideNumber}> {String(currentIndex).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Right Section with Images */}
        <div
          className={`col-md-12 col-lg-8 col-xl-7 d-flex order-1 order-lg-2   align-items-center mt-lg-0 `}
        >
          <div className="h-100 bg-white p-5 w-100">
            <h3 className="mb-1 text-uppercase">Venue</h3>
            <p>Tourist Hotspots: Exploring The Best Places To Visit</p>

            {/* Image Scrolling Area */}
            <div className={ConferenceDetailsStyles.imageContainer}>
              {images.slice(0, 5).map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={`Venue ${index}`}
                  width={250}
                  height={150}
                  className={ConferenceDetailsStyles.image}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
