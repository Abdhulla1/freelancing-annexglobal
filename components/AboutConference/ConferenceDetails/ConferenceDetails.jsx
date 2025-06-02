import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImageDefault from "@/public/images/conferences/upcoming-bg.webp";
import Link from "next/link";
import Image from "next/image";

const ConferenceDetails = ({
  conference,
  Component,
  id,
  logoUrl,
  bgImage = bgImageDefault,
  conferenceName,
  buttonProps = { name: null, href: null },
}) => {
  const headerImages = conference?.webinar?.headerPanelImages

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
                  href={`/conference/${id}`}
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
                  <Image
                    // src={conference?.certificationImage}
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
                <div className="">
                  <h5 className="text-uppercase text-warning opacity-75 mb-3  text-md-start mb-md-1">
                    {conference?.title}
                  </h5>
                  <h4 className="text-uppercase text-white mb-3 mb-md-1">
                    {conferenceName}
                  </h4>
                  <p className="text-white fst-italic">
                    {
                      `Theme: ${conference?.theme}`
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
                  {buttonProps.name && buttonProps.href && (
                    <Link
                      href={buttonProps.href}
                      className={`text-decoration-none fw-bold ${ConferenceDetailsStyles["program-btn"]}`}
                    >
                      {buttonProps.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-md-12 col-lg-3 col-xl-5 mx-auto d-none d-xl-block`}
          >
            {Component && <Component conference={headerImages}  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
