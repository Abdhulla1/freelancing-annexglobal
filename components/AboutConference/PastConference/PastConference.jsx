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

const PastConference = () => {
  const sliderRef = useRef(null);

  return (
    <div className="container-fluid px-5 py-5">
      <h3 className="text-center">Past Conference Ethereal Frames</h3>
      <div className="mt-5">
        <Slider ref={sliderRef} {...settings}>
          <div>
            <div className="px-2">
              <img
                src="/images/conferences/past-conference.webp"
                className={`${PastConferenceStyles["conf_image"]}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="px-2">
              <img
                src="/images/conferences/past-conference-2.webp"
                className={`${PastConferenceStyles["conf_image"]}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="px-2">
              <img
                src="/images/conferences/past-conference.webp"
                className={`${PastConferenceStyles["conf_image"]}`}
                alt=""
              />
            </div>
          </div>
          <div>
            <div className="px-2">
              <img
                src="/images/conferences/past-conference-2.webp"
                className={`${PastConferenceStyles["conf_image"]}`}
                alt=""
              />
            </div>
          </div>
        </Slider>
      </div>
      <div className="mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <button
            className={`${PastConferenceStyles['slider-btn']} ${PastConferenceStyles['btn1']} btn p-0 px-2 py-1`}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <i className="pi-angle-left pi"></i>
          </button>{" "}
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            className={`${PastConferenceStyles['slider-btn']} ${PastConferenceStyles['btn2']} btn p-0 px-2 py-1`}
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
