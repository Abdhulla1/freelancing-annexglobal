import React from "react";
import ConferenceDetailsStyles from "./RegistrationFormHeader.module.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Link from "next/link";
const RegistrationFormHeader = ({ conference }) => {
  return (
    <div className={`${ConferenceDetailsStyles["container"]}`}>
      <div className=" my-5 ">
        <div className="row d-flex flex-column align-items-center justify-content-center ">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center justify-content-center  mt-lg-0">
            <div>
              <div className="d-flex  flex-wrap flex-md-nowrap  justify-content-center justify-content-md-start">
                <Link
                  href={`/conference/${conference._id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={conference.logoUrl}
                    className={`me-4 mb-3 mb-md-0 ${ConferenceDetailsStyles["conferencelogo"]}`}
                    alt="Conference Logo"
                  />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <div
                  className={`col-md-12 col-lg-9  mt-3 mt-lg-0  ${ConferenceDetailsStyles["heading"]}`}
                >
                  <h2 className="text-warning opacity-75 mb-3 mb-md-1">
                  {conference?.conference?.landingPage?.title} 
                  </h2>
                  <h4 className="text-uppercase text-white mb-3 mb-md-1">
                  {conference?.name}
                  </h4>
                  <p className="text-white fst-italic">
                        <b>Theme:</b> {` ${conference?.conference?.landingPage?.theme}`}
      
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
                        <span className="fs-5 text-center">🛏️</span>
                      </div>
                      <div className="text-white mt-3">
                        <b>{conference?.conference?.landingPage?.address}</b>
                        <p className="opacity-75">Hotel</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto ">
            <RegistrationForm conference={conference} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormHeader;
