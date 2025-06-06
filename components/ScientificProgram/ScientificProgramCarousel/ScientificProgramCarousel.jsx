"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./ScientificProgramCarousel.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ScientificProgramCarousel = ({ conference }) => {

  console.log("Conference Data jk for scientific program:", conference);

  const conferencePrograms = conference?.scientificProgram?.scientificProgramAdmin;

  console.log("Conference Programs:", conferencePrograms);

  const [currentIndex, setCurrentIndex] = useState(0);
  const textSectionRef = useRef(null);

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % conferencePrograms.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + conferencePrograms.length) % conferencePrograms.length
    );
  };

  useEffect(() => {
    if (textSectionRef.current) {
      const activeElement = textSectionRef.current.querySelector(
        `.${styles.activeProgram}`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [currentIndex]);

  return (
    <div className={`container ${styles.containerWrapper}`}>
      <div className={`col-md-6 ${styles.textSection}`} ref={textSectionRef}>
        <h2 className="fw-bold text-center mb-5">
          Annex Global Conference Programs
        </h2>
        <div className={styles.content}>
        <div className={`${styles.carouselButtons}`}>
          <button
            className={`btn rounded-circle ${styles.carouselButton}`}
            onClick={handlePrevImage}
          >
            <i className="pi pi-angle-left text-white"></i>
          </button>
          <button
            className={`btn rounded-circle ${styles.carouselButton}`}
            onClick={handleNextImage}
          >
            <i className="pi pi-angle-right text-white"></i>
          </button>
        </div>
        <div className={`col-md-6 ${styles.imageCarousel}`}>
          {conferencePrograms.map((program, index) => {
            let scale, zIndex, opacity, translateX;

            if (index === currentIndex) {
              scale = 1;
              zIndex = 10;
              opacity = 1;
              translateX = 0;
              
            } else if (
              (index - 1 + conferencePrograms.length) %
                conferencePrograms.length ===
              currentIndex
            ) {
              scale = 0.8;
              zIndex = 9;
              opacity = 1;
              translateX = -160;
            } else if (
              (index + 1) % conferencePrograms.length ===
              currentIndex
            ) {
              scale = 0.8;
              zIndex = 8;
              opacity = 1;
              translateX = 160;
            } else {
              scale = 0.7;
              zIndex = 7;
              opacity = 1;
              translateX = 50;
            }

            return (
              <div key={index}  className={styles.carouselImage} style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,

              }}>
                <img
                  src={program.coverImage}
                  alt="Conference"
                  className={styles.images}
                />
              </div>
            );
          })}
        </div>
     
        </div>
       
        <div>
          <div className={`${styles.programItem}`}>
            <h6>{conferencePrograms[currentIndex].programDate}</h6>
            <p className="mb-0">{conferencePrograms[currentIndex].title}</p>
          </div>
        </div>
        <button
          className={`col-md-6 brand-btn btn-warning  ${styles.downloadButton}`}
          onClick={() =>
            window.open(conferencePrograms[currentIndex].programFile, "_blank")
          }
        >
          {conferencePrograms[currentIndex].programDate} | Download
        </button>
      </div>
    </div>
  );
};

export default ScientificProgramCarousel;
