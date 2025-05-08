"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImage from "@/public/images/conferences/upcoming-bg.webp";
import annexLogo from "@/public/images/conferences/annex.png";
import speakerBg from "@/public/images/conferences/conferenceAlumniSpeakers.png";
import Link from "next/link";
import Image from "next/image";
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

const speakerData = [
  {
    imgSrc: "/images/home/speakers/member.png",
    name: "Alex Micol",
    location: "India",
  },
  {
    imgSrc: "/images/home/speakers/membertwo.png",
    name: "Alex Micol",
    location: "India",
  },
  {
    imgSrc: "/images/home/speakers/speaker.png",
    name: "Alex Micol",
    location: "India",
  },
  {
    imgSrc: "/images/home/speakers/member.png",
    name: "Alex Micol",
    location: "India",
  },
  {
    imgSrc: "/images/home/speakers/membertwo.png",
    name: "Alex Micol",
    location: "India",
  },
  {
    imgSrc: "/images/home/speakers/speaker.png",
    name: "Alex Micol",
    location: "India",
  },
];

const ConferenceDetails = ({ conference }) => {
  const sliderRef = useRef(null);

  return (
    <div
      className={ConferenceDetailsStyles["container"]}
      style={{ "--bg-image": `url(${bgImage.src})` }}
    >
      <div className="ms-3 justify-content-center p-2">
        <div className="row gap-1">
          <div className="col-md-12 col-lg-8 col-xl-6 d-flex align-items-center mt-5 mt-lg-0">
            <div>
              <div className="d-flex align-items-center p-3">
                <Link href="#" className="text-decoration-none">
                  <img
                    src={conference.icon}
                    className={`me-4 ${ConferenceDetailsStyles["conferencelogo"]}`}
                    alt="Conference Logo"
                  />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <div className={`col-md-12 col-lg-9  ${ConferenceDetailsStyles["heading"]}`}>
                  <h6 className="text-uppercase text-warning opacity-75">
                    2nd International Conference On
                  </h6>
                  <h5 className="text-uppercase text-white">
                    {conference.title}
                  </h5>
                  <p className="text-white fst-italic">
                    {
                      "Theme: “Enhancing Women’s Health: Improvement, Difficulties, and Innovative Thoughts in Obstetrics and Gynecology”"
                    }
                  </p>
                  <div className={`mt-1 ${ConferenceDetailsStyles["timings"]}`}>
                    <div className="d-inline-flex flex-nowrap align-items-center  gap-2 p-1">
                      <div>
                        <i
                          className={`pi h6 pi-calendar  ${ConferenceDetailsStyles["icons"]}`}
                        ></i>
                      </div>
                      <div className="text-white">
                        <b>12-03-2025</b>
                        <p className="opacity-75">Date</p>
                      </div>
                      <div className="ms-3 fs-2 text-white opacity-75">|</div>
                    </div>
                    <div className="d-inline-flex align-items-center gap-2 p-1">
                      <div>
                        <i
                          className={`pi h6 pi-map-marker   ${ConferenceDetailsStyles["icons"]}`}
                        ></i>
                      </div>
                      <div className="text-white">
                        <b>Dubai, UAE</b>
                        <p className="opacity-75">Location</p>
                      </div>
                      <div className="ms-3 fs-2 text-white opacity-75">|</div>
                    </div>
                    <div className="d-inline-flex align-items-center gap-2 p-1">
                      <div>
                        <i
                          className={`pi h6 pi-clipboard  ${ConferenceDetailsStyles["icons"]}`}
                        ></i>
                      </div>
                      <div
                        className="text-white"
                      >
                        <b>City Seasons Hotel, Deira</b>
                        <p className="opacity-75">Hotel</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 gap-3 d-flex flex-column flex-md-row">
                    <Link
                      href={`/conference/${conference.id}/registration`}
                      className={`text-decoration-none ${ConferenceDetailsStyles["brand-btn"]}`}
                    >
                      Grab Your Seats Now
                    </Link>
                    <Link
                      href={`/conference/${conference.id}/scientific-program`}
                      className={`text-decoration-none ${ConferenceDetailsStyles["program-btn"]}`}
                    >
                      Scientific Program
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block rounded p-2 ${ConferenceDetailsStyles["speaker-container"]}`}
            style={{ "--speaker-bg-image": `url(${speakerBg.src})` }}
          >
            <div className="d-flex position-relative align-items-center mb-2">
              <img
                src={annexLogo.src}
                className={`me-4 ${ConferenceDetailsStyles["annexlogo"]}`}
                alt="Conference Logo"
              />
              <h4 className="text-uppercase position-absolute start-50 translate-middle-x m-0 ">
                Alumni Speakers
              </h4>
            </div>
            <Slider ref={sliderRef} {...settings}>
              {speakerData.map((el, i) => (
                <SpeakerCard
                  key={i}
                  imgSrc={el.imgSrc}
                  name={el.name}
                  location={el.location}
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
              <small>gynecology@annexglobalconferences.com</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;

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
