"use client";
import React, { useState, useEffect } from "react";
import AlumniSpeakerStyles from "./AlumniSpeakers.module.css";
import Slider from "react-slick";
import { Sidebar } from "primereact/sidebar";

const CustomArrow = ({ className, style, onClick, direction }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "linear-gradient(45deg, #00004d, #0000a6)",
        borderTopLeftRadius: direction === "left" ? "20%" : "0",
        borderBottomLeftRadius: direction === "left" ? "20%" : "0",
        borderTopRightRadius: direction === "right" ? "20%" : "0",
        borderBottomRightRadius: direction === "right" ? "20%" : "0",
        width: "40px",
        height: "90px",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      {direction === "left" ? (
        <i className="pi-angle-double-left text-white pi"></i>
      ) : (
        <i className="pi-angle-double-right text-white pi"></i>
      )}
    </div>
  );
};

const AlumniSpeakers = ({ conference }) => {
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakerData = conference?.speakers?.speakers;

  const settings = {
    dots: true,
    infinite: Math.ceil(speakerData?.length / 8) > 1, // Conditional infinite
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
    setVisibleDetails(true);
  };
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr?.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const slides = isMobile
    ? chunkArray(speakerData, 1)
    : chunkArray(speakerData, 8);

  return (
    <div className="alumni-speakers">
      <Sidebar
        visible={visibleDetails}
        position="right"
        blockScroll={true}
        onHide={() => setVisibleDetails(false)}
        style={{
          width: "32rem",
          borderTopLeftRadius: "40px",
          top: 108,
          transform: "none",
          height: "83vh",
          maxHeight: "100vh",
          position: "fixed",
          borderBottomLeftRadius: "40px",
        }}
      >
        {selectedSpeaker && (
          <>
            <div className="row">
              <div className="col-4">
                <div className={AlumniSpeakerStyles["card-header"]}>
                  <img
                    onClick={() => setVisibleDetails(true)}
                    src={selectedSpeaker.imageUrl}
                    alt="Profile"
                    className={AlumniSpeakerStyles["profile-img2"]}
                  />
                </div>
              </div>
              <div className="col-8 d-flex align-items-center">
                <div>
                  <h4 className="text-black">{selectedSpeaker.name}</h4>
                  <h5>{selectedSpeaker.companyDetails}</h5>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h5 className="text-black">Title: "{selectedSpeaker.title}" </h5>
              <div className={AlumniSpeakerStyles["about-content-height"]}>
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: selectedSpeaker.bioData }}
                />
                {/* <p>{selectedSpeaker.bioData}</p> */}
              </div>
            </div>
          </>
        )}
      </Sidebar>
      <div className="container mt-5">
        <div className="col-xl-3 col-lg-4 col-md-6 ">
          <div className={AlumniSpeakerStyles["header"]}>MEET OUR SPEAKERS</div>
        </div>
        <div className=" p-2 container flex-wrap">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div className="container p-5">
                  <div className="row">
                    {slide.map((speaker, i) => (
                      <div className="col-md-6 col-lg-4 col-xl-3 mb-3" key={i}>
                        <div className={AlumniSpeakerStyles["card"]}>
                          <div className={AlumniSpeakerStyles["card-header"]}>
                            <img
                              onClick={() => handleSpeakerClick(speaker)}
                              src={speaker.imageUrl}
                              alt="Profile"
                              className={AlumniSpeakerStyles["profile-img"]}
                            />
                            <div className={AlumniSpeakerStyles["mic-icon"]}>
                              <img
                                src="/icons/mic.png"
                                alt="Mic"
                                onClick={() => handleSpeakerClick(speaker)}
                              />
                            </div>
                          </div>
                          <div className={AlumniSpeakerStyles["card-body"]}>
                            <div
                              onClick={() => handleSpeakerClick(speaker)}
                              className={AlumniSpeakerStyles["name"]}
                            >
                              {speaker.name}
                            </div>
                            {/* <div className={AlumniSpeakerStyles["designation"]}>
                            {speaker.companyDetails}
                          </div> */}
                            <div className={AlumniSpeakerStyles["company"]}>
                              {speaker.companyDetails}
                            </div>
                            {/* <img src={speaker.companyLogo} alt={speaker.company} /> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AlumniSpeakers;
