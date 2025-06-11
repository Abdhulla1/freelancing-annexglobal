import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImageDefault from "@/public/images/conferences/upcoming-bg.webp";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const ConferenceDetails = ({
  conference,
  Component,
  logoUrl,
  id,
  conferenceName,
  headerPanelImages,
  bgImage = bgImageDefault,
  buttonProps = { name: null, href: null },
}) => {

  return (
    <div
      className={ConferenceDetailsStyles["container"]}
      style={{ "--bg-image": `url(${bgImage.src})` }}
    >
      <div className="ms-3 justify-content-center  ps-0 p-2 pe-0 overflow-hidden">
        <div className="row gap-1">
          <div className="col-md-12 col-lg-8 col-xl-6 d-flex align-items-center mt-5 mt-lg-0">
            <div className="d-flex flex-wrap flex-md-nowrap  align-items-center justify-content-center justify-content-md-start  p-3">
              {/* <div className="row justify-content-center me-3 "> */}
                 <div
                className="d-flex flex-column align-items-center me-5"
                style={{ maxWidth: "190px", width: "100%" }}
              >
                <Link
                  href={`/conference/${conference?.id}`}
                  className={`text-decoration-none `}
                >
                  <div className={ConferenceDetailsStyles.logoWrapper}>
                    <Image
                      src={logoUrl}
                      alt="Conference Logo"
                      fill
                      className={ConferenceDetailsStyles.logoImage}
                    />
                  </div>
                </Link>
                <div
                  className={`rounded mt-3 text-center d-none d-md-block position-relative ${ConferenceDetailsStyles["certification"]}`}
                >
                   {conference?.certificationImage && (
                                      <Image
                                        src={conference?.certificationImage}
                                        fill
                                        alt="Certification"
                                        style={{ objectFit: "contain" }}
                                      />
                                    )}
                </div>
              </div>
              {/* &nbsp; */}

              <div
                className={`col-md-12 col-lg-9    ${ConferenceDetailsStyles["heading"]}`}
              >
                <div className="">
                  <h2 className=" text-warning opacity-75 mb-3 mb-md-1">
                    {conference?.title}
                  </h2>
                  <Marquee  style={{ maxWidth: "80%" }} Marqueegradient={true} autoFill={true} gradientColor='transparent' speed={50}
  pauseOnHover={true}>
                    <h3
                      className={`text-uppercase fw-bold text-white mb-3 mb-md-3 `}
                    >
                      {conferenceName}
                    </h3>
                    <div style={{ width: "60px" }}></div> 
                  </Marquee>
                  <p className="text-white fst-italic">
                        <b>Theme:</b>  {
                      ` ${conference?.theme}`
                    }
                  </p>
                </div>

                <div className={`mt-4 ${ConferenceDetailsStyles["timings"]}`}>
                  <div className="d-inline-flex flex-nowrap align-items-center justify-content-center  gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-calendar  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">📅</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>{conference?.startDate}</b>
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
                      <b>{conference?.location}</b>
                      <p className="opacity-75">Location</p>
                    </div>
                    <div className="ms-3 fs-2 text-white opacity-75">|</div>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 p-1">
                    <div>
                      {/* <i
                          className={`pi h6 pi-clipboard  ${ConferenceDetailsStyles["icons"]}`}
                        ></i> */}
                      <span className="fs-5 text-center">🏨</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>{conference?.address}</b>
                      <p className="opacity-75">Hotel</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 gap-3 d-flex flex-column flex-md-row">
                  <Link
                    href={`/conference/${id}/registration`}
                    className={`text-decoration-none fw-bold ${ConferenceDetailsStyles["brand-btn"]}`}
                  >
                    Grab Your Seats Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-md-12 col-lg-3 col-xl-5 ms-auto d-none d-lg-block `}
          >
            {Component && <Component headerPanelImages={headerPanelImages} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
