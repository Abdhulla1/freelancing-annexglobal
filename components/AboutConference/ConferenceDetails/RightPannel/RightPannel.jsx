"use client";
import React, { useRef } from "react";
import RightPannelStyles from "./RightPannel.module.css";
import annexLogo from "@/public/images/conferences/annex.png";
import speakerBg from "@/public/images/conferences/conferenceAlumniSpeakers.png";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  variableWidth: false, // disable variableWidth for consistent card layout
  responsive: [
    {
      breakpoint: 1024, // Tablets & small desktops
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 768, // Tablets & large phones
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
      },
    },
    {
      breakpoint: 600, // Mobile screens (disable adaptiveHeight & variableWidth)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        variableWidth: false,
      },
    },
    {
      breakpoint: 480, // Smaller mobile screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false,
        variableWidth: false,
      },
    },
  ],
};

export default function RightPannel({conference, id}) {

  const sliderRef = useRef(null);
  return (
    <div>
      <div
        className={`w-100 mb-3 rounded p-2  ${RightPannelStyles["speaker-container"]}`}
        style={{ "--speaker-bg-image": `url(${speakerBg.src})` }}
      >
        <div className="d-flex position-relative align-items-center mb-2">
          <img
            src={annexLogo.src}
            className={`me-4 ${RightPannelStyles["annexlogo"]}`}
            alt="Conference Logo"
          />
          <h4 className="text-uppercase position-absolute start-50 translate-middle-x m-0 ">
            Alumni Speakers
          </h4>
        </div>
        <Slider ref={sliderRef} {...settings}>
          {conference.map((el, i) => (
            <SpeakerCard
              key={i}
              imgSrc={el.imageUrl}
              name={el.name}
              location={el.country}
            />
          ))}
        </Slider>
        <div className="mt-5 d-flex justify-content-between align-items-end">
          <div className="d-flex justify-content-start align-items-center">
            <button
              className={`brand-btn px-3`}
              onClick={() => sliderRef.current.slickPrev()}
            >
              <i className="pi-angle-left pi"></i>
            </button>{" "}
            &nbsp;&nbsp;
            <button
              className={`brand-btn px-3 `}
              onClick={() => sliderRef.current.slickNext()}
            >
              <i className="pi-angle-right pi"></i>
            </button>
          </div>
          {/* <small>gynecology@annexglobalconferences.com</small> */}
        </div>
      </div>
   <div className="d-flex justify-content-between gap-3 mt-3">
     <span className="bg-white py-2 px-3 rounded text-warning">
    <i className="bx bxs-bookmark text-center me-1"></i>CPD Accredited Conference
  </span>
  <Link href={`/conference/${id}/past-conferences`} className="bg-white py-2 px-3 text-decoration-none rounded text-warning">
    Past Conferences Reports
  </Link>
 
</div>

    </div>
  );
}
function SpeakerCard({ imgSrc, name, location }) {
  return (
    <div
      className="ms-3 d-flex flex-column align-items-center justify-content-center"
      style={{ width: "auto", flex: "1" }}
    >
      <div className="rounded-circle border border-2 border-primary p-1 overflow-hidden mb-2">
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt="speaker"
          className="rounded-circle bg-white"
        />
      </div>
      <h5 className="text-center">{name}</h5>
      <small className="text-center">{location}</small>
    </div>
  );
}
