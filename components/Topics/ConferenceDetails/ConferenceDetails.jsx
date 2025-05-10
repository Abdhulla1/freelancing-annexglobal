
import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImageDefault from "@/public/images/conferences/upcoming-bg.webp";

import Link from "next/link";

const ConferenceDetails = ({ conference, Component,bgImage=bgImageDefault,buttonProps={name:null,href:null}}) => {

  return (
    <div
      className={ConferenceDetailsStyles["container"]}
      style={{ "--bg-image": `url(${bgImage.src})` }}
    >
      <div className="ms-3 justify-content-center py-2 ps-2 pe-0 overflow-hidden">
        <div className="row gap-1">
          <div className="col-md-12 col-lg-8 col-xl-6 d-flex align-items-center mt-5 mt-lg-0">
            <div className="d-flex flex-wrap flex-md-nowrap  align-items-center justify-content-center justify-content-md-start  p-3">
              <Link href={`/conference/${conference.id}`} className="text-decoration-none">
                <img
                  src={conference.icon}
                  className={`me-4 mb-3 mb-md-0 ${ConferenceDetailsStyles["conferencelogo"]}`}
                  alt="Conference Logo"
                />
              </Link>
              &nbsp;&nbsp;&nbsp;
              <div
                className={`col-md-12 col-lg-9    ${ConferenceDetailsStyles["heading"]}`}
              >
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
            className={`col-md-12 col-lg-3 col-xl-5 ms-auto d-none d-lg-block `}
          >
            {Component && <Component />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
