import React from "react";
// import Slider from "react-slick";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImageDefault from "@/public/images/conferences/upcoming-bg.webp";
// import annexLogo from "@/public/images/conferences/annex.png";
// import speakerBg from "@/public/images/conferences/conferenceAlumniSpeakers.png";
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

const ConferenceDetails = ({
  conference,
  Component,
  bgImage = bgImageDefault,
  buttonProps = { name: null, href: null },
}) => {
  return (
    <div
      className={ConferenceDetailsStyles["container"]}
      style={{ "--bg-image": `url(${bgImage.src})` }}
    >
      <div className="ms-3 justify-content-center ps-0 p-2">
        <div className="row gap-1">
          <div className="col-md-12 col-lg-8 col-xl-6 d-flex align-items-center mt-5 mt-lg-0">
            <div className="d-flex flex-wrap flex-md-nowrap  align-items-center justify-content-center justify-content-md-start  p-3">
              <div className="row justify-content-center me-3 ">
                <Link
                  href={`/conference/${conference.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={conference.icon}
                    className={`mb-3 mb-md-0 ${ConferenceDetailsStyles["conferencelogo"]}`}
                    alt="Conference Logo"
                  />
                </Link>
                <div
                  className={`rounded mt-3 text-center d-none d-md-block position-relative ${ConferenceDetailsStyles["certification"]}`}
                >
                  <Image
                    src={"/images/conferences/certificate.jpg"}
                    fill
                    alt="Certification"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
              {/* &nbsp; */}
              <div
                className={`col-md-12 col-lg-9    ${ConferenceDetailsStyles["heading"]}`}
              >
                {/* <h3 className="text-uppercase text-white">Speakers</h3> */}
                <h6 className="text-uppercase text-warning opacity-75 mb-3 mb-md-1">
                  2nd International Conference On
                </h6>
                <h5 className="text-uppercase text-white mb-3 mb-md-1">
                  {conference.title}
                </h5>
                <p className="text-white fst-italic">
                  {
                    "Theme: “Enhancing Women’s Health: Improvement, Difficulties, and Innovative Thoughts in Obstetrics and Gynecology”"
                  }
                </p>
                <div className={`mt-1 ${ConferenceDetailsStyles["timings"]}`}>
                  <div className="d-inline-flex flex-nowrap align-items-center justify-content-center  gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-calendar  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">📅</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>12-03-2025</b>
                      <p className="opacity-75">Date</p>
                    </div>
                    <div className="ms-3 fs-2 text-white opacity-75">|</div>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-map-marker   ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}

                      <span className="fs-5 text-center">🧭</span>
                    </div>
                    <div className="text-white  mt-3">
                      <b>Dubai, UAE</b>
                      <p className="opacity-75">Location</p>
                    </div>
                    <div className="ms-3 fs-2 text-white opacity-75">|</div>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-clipboard  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">🛏️</span>
                    </div>
                    <div className="text-white mt-3">
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
                  {buttonProps.name && buttonProps.href && (
                    <Link
                      href={buttonProps.href}
                      className={`text-decoration-none ${ConferenceDetailsStyles["program-btn"]}`}
                    >
                      {buttonProps.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-md-12 col-lg-3 col-xl-5 mx-auto d-none d-lg-block`}
          >
            {Component && <Component />}
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
