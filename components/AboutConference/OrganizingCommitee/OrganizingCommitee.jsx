"use client";
import React, { useState, useEffect } from "react";
import style from "./OrganizingCommitee.module.css";
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

const OrganizingCommitee = ({ organizingCommittee }) => {
  
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const speakerData = organizingCommittee?.ocms;

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
        onHide={() => setVisibleDetails(false)}
        style={{
          width: "32rem",
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
        }}
      >
        {selectedSpeaker && (
          <>
            <div className="row">
              <div className="col-md-4">
                <div className={style["card-header"]}>
                  <img
                    onClick={() => setVisibleDetails(true)}
                    src={selectedSpeaker.imageUrl}
                    alt="Profile"
                    className={style["profile-img2"]}
                  />
                </div>
              </div>
              <div className="col-md-8 d-flex align-items-center">
                <div>
                  <h4 className="text-black">{selectedSpeaker.name}</h4>
                  <h5>
                    {selectedSpeaker.designation},{" "}
                    {selectedSpeaker.companyDetails}
                  </h5>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h5 className="text-black">About {selectedSpeaker.name}</h5>
              <div
                className={`ql-editor ${style["about-content-height"]}`}
                dangerouslySetInnerHTML={{ __html: selectedSpeaker.bioData }}
              ></div>
            </div>
          </>
        )}
      </Sidebar>
      <div className="container mt-5">
        <div className="col-xl-4 col-lg-4 col-md-6 ">
          <div className={style["header"]}>MEET OUR ORGANIZING COMMITTEE</div>
        </div>

        {/* <div className="mt-4">
          <h3 className="fw-bold">Event Oversight Panel</h3>
        </div> */}

      <div className=" p-2 container">
      {isMobile ? (
        // 📱 Mobile View - Grid without slider
        <div className="row">
          {slides.flat().map((speaker, index) => (
            <div className="col-6 mb-3" key={index}>
              <div className={style["card"]}>
                <div className={style["card-header"]}>
                  <img
                    onClick={() => handleSpeakerClick(speaker)}
                    src={speaker.imageUrl}
                    alt="Profile"
                    className={style["profile-img"]}
                  />
                  <div className={style["mic-icon"]}>
                    <img src="/icons/micwhite.png" alt="Mic" />
                  </div>
                </div>
                <div className={style["card-body"]}>
                  <div
                    onClick={() => handleSpeakerClick(speaker)}
                    className={style["name"]}
                  >
                    {speaker.name}
                  </div>
                  <div className={style["designation"]}>
                    {speaker.companyDetails}
                  </div>
                  <div className={style["company"]}>
                    <img
                      src={speaker.companyLogo}
                      alt={speaker.companyDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // 💻 Desktop View - Slider
        <Slider {...settings}>
          {slides?.map((slide, index) => (
            <div key={index}>
              <div className="container pt-5 pb-3">
                <div className="row">
                  {slide?.map((speaker, index) => (
                    <div
                      className="col-md-6 col-lg-4 col-xl-3 mb-3"
                      key={index}
                    >
                      <div className={style["card"]}>
                        <div className={style["card-header"]}>
                          <img
                            onClick={() => handleSpeakerClick(speaker)}
                            src={speaker.imageUrl}
                            alt="Profile"
                            className={style["profile-img"]}
                          />
                          <div className={style["mic-icon"]}>
                            <img src="/icons/micwhite.png" alt="Mic" />
                          </div>
                        </div>
                        <div className={style["card-body"]}>
                          <div
                            onClick={() => handleSpeakerClick(speaker)}
                            className={style["name"]}
                          >
                            {speaker.name}
                          </div>
                          <div className={style["designation"]}>
                          </div>
                          <div className={style["company"]}>
                            {speaker.companyDetails}
                            {/* <img
                              src={speaker.companyLogo}
                              alt={speaker.companyDetails}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      </div>
      </div>


    </div>
  );
};

export default OrganizingCommitee;
