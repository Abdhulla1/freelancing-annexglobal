"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./WebinarProgramCarousel.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WebinarProgramCarousel = ({conference}) => {
  // const conferencePrograms = [
  //   {
  //     image: "/images/conferences/program-one.png",
  //     date: "March 17-18 2025",
  //     title: "Annual Congress On Gynecology, Obstetrics, And Women's Health",
  //   },
  //   {
  //     image: "/images/conferences/program-two.png",
  //     date: "March 15-18 2025",
  //     title: "Scientific committee will undertake a thorough review process. Rest assured",
  //   },
  //   {
  //     image: "/images/conferences/program-three.png",
  //     date: "March 17-05 2025",
  //     title: "Annual Congress On Gynecology, Obstetrics Health",
  //   },
   
  //   {
  //     image: "/images/conferences/program-one.png",
  //     date: "March 17-18 2025",
  //     title: "Annual Congress On Gynecology, Obstetrics, And Women's Health",
  //   },
  //   {
  //     image: "/images/conferences/program-two.png",
  //     date: "March 15-18 2025",
  //     title: "Scientific committee will undertake a thorough review process. Rest assured",
  //   },
  //   {
  //     image: "/images/conferences/program-three.png",
  //     date: "March 17-05 2025",
  //     title: "Annual Congress On Gynecology, Obstetrics Health",
  //   },
   
  // ];

  const conferencePrograms = conference|| [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const textSectionRef = useRef(null);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % conferencePrograms?.length);
  };

  useEffect(() => {
    if (textSectionRef.current) {
      const activeElement = textSectionRef.current.querySelector(`.${styles.activeProgram}`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentIndex]);

  return (
    <div className={`container p-5 mt-3 ${styles.containerWrapper}`}>
      <div className={styles.contentWrapper}>
        {/* Left Side - Scrollable Text Section */}
        <div className={`col-md-6 ${styles.textSection}`} ref={textSectionRef}>
          <h2 className="fw-bold mb-4">Annex Global Conference Programs</h2>
          <div className={styles.scrollContainer}>
            {conferencePrograms.map((program, index) => (
              <div
                key={index}
                className={`${styles.programItem} ${
                  index === currentIndex ? styles.activeProgram : styles.inactiveProgram
                }`}
              >
                <h6>{program?.programDate}</h6>
                <p className="mb-0">{program?.title}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open(conferencePrograms[currentIndex]?.programFile, "_blank")}
           className={`brand-btn  text-white ${styles.downloadButton}`}>
            {conferencePrograms[currentIndex]?.programDate} | Download
          </button>
        </div>

        {/* Right Side - Stacked Image Carousel */}
        <div className={`col-md-6 ${styles.imageCarousel}`}>
          {conferencePrograms.map((program, index) => {
            let scale, zIndex, opacity, translateX;

            if (index === currentIndex) {
              scale = 1;
              zIndex = 10;
              opacity = 1;
              translateX = -120;
            } else if ((index - 1 + conferencePrograms.length) % conferencePrograms.length === currentIndex) {
              scale = 0.9;
              zIndex = 9;
              opacity = 1;
              translateX = -30;
            } else if ((index + 1) % conferencePrograms.length === currentIndex) {
              scale = 0.8;
              zIndex = 8;
              opacity = 1;
              translateX = 50;
            } else {
              scale = 0.7;
              zIndex = 7;
              opacity = 1;
              translateX = 50;
            }

            return (
              <img
                key={index}
                src={program.coverImage}
                alt="Conference"
                className={styles.carouselImage}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
              />
            );
          })}

          <button className={`btn rounded-circle ${styles.carouselButton}`} onClick={handleNextImage}>
            <i className="pi pi-angle-right text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebinarProgramCarousel;
