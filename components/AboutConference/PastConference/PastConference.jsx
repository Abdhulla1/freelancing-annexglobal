"use client";
import React from "react";
import PastConferenceStyles from "./PastConference.module.css";
import Slider from "react-slick";
import { useRef } from "react";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024, // For tablets & smaller desktops
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768, // For tablets & large phones
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480, // For mobile screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const PastConference = ({ pastConference }) => {
  const sliderRef = useRef(null);

  return (
    <div className="container px-5 py-5">
      <h3 className="text-center fw-bold">Past Conference Ethereal Frames</h3>
      <div className="mt-5">
        <Slider ref={sliderRef} {...settings}>
          {pastConference.map((item, index) => (
            <div key={item.imageId || index}>
              <div className="px-2">
                <img
                  src={item.imageUrl}
                  className={PastConferenceStyles["conf_image"]}
                  alt={`Conference Image ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <button
            className={`${PastConferenceStyles["slider-btn"]} ${PastConferenceStyles["btn1"]} btn p-0 px-2 py-1`}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <i className="pi-angle-left pi"></i>
          </button>{" "}
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            className={`${PastConferenceStyles["slider-btn"]} ${PastConferenceStyles["btn2"]} btn p-0 px-2 py-1`}
            onClick={() => sliderRef.current.slickNext()}
          >
            <i className="pi-angle-right pi"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastConference;
