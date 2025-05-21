"use client";
import React, { useState, useRef } from "react";
import VisualRecapStyles from "./VisualRecap.module.css";
import ReactPlayer from "react-player/lazy";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const VisualRecap = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentIndex(newIndex);
      setPlayingIndex(null); // Pause the video when the slide changes
    },
  };

  const recapData = [
    {
      id: 1,
      videoUrl: "https://youtu.be/IVRMQPPI64k",
      thumbnail: "/images/conferences/yt-thumb.png",
      yt_title: "Join Us At The Upcoming Conference In May 2025",
      title: "Annual Congress on Gynecology, Obstetrics and Women's Health",
      description:
        "The meeting will include a wide range of topics, plenary sessions, latest lectures, interactive sessions, and debates.",
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/watch?v=P3SAl5fg-Ek",
      thumbnail: "/images/conferences/yt-thumb.png",
      yt_title: "Join Us At The Upcoming Conference In June 2025",
      title: "International Conference on Cardiology & Cardiovascular Research",
      description:
        "Join top cardiologists and researchers for a deep dive into new advancements and treatments in cardiovascular research.",
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/watch?v=3zdncBs-lM0",
      thumbnail: "/images/conferences/yt-thumb.png",
      yt_title: "Join Us At The Upcoming Conference In July 2025",
      title: "Global Summit on Digital Transformation in Healthcare",
      description:
        "A comprehensive conference on the impact of digital transformation in medical practices, featuring industry leaders.",
    },
  ];

  return (
    <div className="container my-5 overflow-hidden">
      <div className="row">
        <div className="col-lg-9">
          <Slider ref={sliderRef} {...settings}>
            {recapData.map((data, index) => (
              <div
                key={data.id}
                className={VisualRecapStyles["videoplayer-container"]}
                style={{ position: "relative" }}
              >
                {playingIndex === index ? (
                  <ReactPlayer
                    controls
                    url={data.videoUrl}
                    width="100%"
                    height="100%" 
                    style={{ aspectRatio: "16/9" }} 
                    
                  />
                ) : (
                  <div className="position-relative w-100">
                    <div className={VisualRecapStyles["gradient-shadow"]}>
                      <img src="/icons/annex_logo.png" alt="Annex Conference" />
                      <p className="h5 fw-normal mb-0">{data.yt_title}</p>
                    </div>
                    <img
                      src={data.thumbnail}
                      className={VisualRecapStyles["conference-img"]}
                      alt="Video Thumbnail"
                    />
                    <button
                      className="position-absolute top-50 start-50 translate-middle bg-transparent text-white rounded-circle border-0"
                      style={{ width: "100px", height: "100px" }}
                      onClick={() => setPlayingIndex(index)}
                    >
                      <img
                        src="/icons/play-icon.png"
                        alt="Play Icon"
                        className="img-fluid"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </Slider>
          <div className={VisualRecapStyles["sub-thumbnail-container"]}>
            {recapData.map((data, i) => (
              <div key={i}>
                <img
                  onClick={() => sliderRef.current?.slickGoTo(i)}
                  src={data.thumbnail}
                  className={`${
                    i == currentIndex
                      ? VisualRecapStyles["sub-thumb-highlight"]
                      : ""
                  } ${VisualRecapStyles["sub-thumbnail"]}`}
                  alt=""
                />{" "}
                &nbsp; &nbsp;
              </div>
            ))}
          </div>
        </div>
        <div className={`d-flex align-items-end`}>
          <div className={` ${VisualRecapStyles["swiper-content"]}`}>
            <div className={VisualRecapStyles["btn-container"]}>
              <button
                className={`${VisualRecapStyles["swipe-btn"]} btn btn-dark`}
                onClick={() => sliderRef.current.slickPrev()}
              >
                <i className="pi pi-angle-left text-white"></i>
              </button>
              <button
                className={`${VisualRecapStyles["swipe-btn"]} btn btn-dark`}
                onClick={() => sliderRef.current.slickNext()}
              >
                <i className="pi pi-angle-right text-white"></i>
              </button>
            </div>
            <div className={` ${VisualRecapStyles["content"]}`}>
              <h5>{recapData[currentIndex].title}</h5>
              <p className="mt-3">{recapData[currentIndex].description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualRecap;
