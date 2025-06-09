import React from "react";
import ConferenceDetailsStyles from "./SponsorsExhibitorsDetails.module.css";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const SponsorsExhibitorsDetails = ({ conference}) => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="ms-4">
        <div className="row ">
          <div className="col-md-12 col-lg-6 col-xl-6 d-flex align-items-center mt-5 mt-lg-0">
            <div className="d-flex flex-wrap flex-md-nowrap  align-items-center justify-content-center justify-content-md-start  p-3">
              <div className="row justify-content-center me-3 ">
                <Link
                  href={`/conference/${ conference?._id}`}
                  className={`text-decoration-none `}
                >
                  <div className={ConferenceDetailsStyles.logoWrapper}>
                    <Image
                      src={ conference?.logoUrl }
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
                className={`col-md-12 col-lg-9 ${ConferenceDetailsStyles["heading"]}`}
              >
                <div className="">
                  <h2 className=" opacity-75 mb-3  text-md-start mb-md-2">
                    {conference?.conference?.landingPage?.title}
                  </h2>
                  <Marquee Marqueegradient={true} autoFill={true} gradientColor='transparent' speed={50}
  pauseOnHover={true}>
                    <h3
                      className={`text-uppercase fw-bold text-white mb-3 mb-md-3 `}
                    >
                      {conference?.conference?.landingPage?.conference}
                    </h3>
                    <div style={{ width: "60px" }}></div> 
                  </Marquee>

                  <p className="m-0 text-white fst-italic">
                    <b>Theme:</b> {` ${conference?.conference?.landingPage?.theme}`}
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
                      <b>{conference?.conference?.landingPage?.startDate}</b>
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
                      <b>{conference?.conference?.landingPage?.location}</b>
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
                      <b>{conference?.conference?.landingPage?.address}</b>
                      <p className="opacity-75">Hotel</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 gap-3 d-flex flex-column flex-md-row">
                  <Link
                    href={`/conference/${ conference?._id}/registration`}
                    className={`text-decoration-none fw-bold ${ConferenceDetailsStyles["brand-btn"]}`}
                  >
                    Grab Your Seats Now
                  </Link>
             
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 ml-6 mx-auto d-none d-lg-block">
             <Image
                            className={ConferenceDetailsStyles["ocm"]}
                            src="/images/conferences/sponsors-exhibitors-bg-card.png"
                            alt="speaker"
                            height={362}
                            width={531}
                            quality={100}
                          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsExhibitorsDetails;
