import React from "react";
import ConferenceDetailsStyles from "./RegistrationFormHeader.module.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Link from "next/link";
const RegistrationFormHeader = ({ conference }) => {
  console.log("Conference Details:", conference);
  const specialRegistration = conference?.specialRegistration?.personalDetails || {};
  console.log("Special Registration Details:", specialRegistration);

  return (
    <div className={`${ConferenceDetailsStyles["container"]}`}>
      <div className=" my-5 ">
        <div className="row d-flex flex-column align-items-center justify-content-center ">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center justify-content-center  mt-lg-0">
            <div>
              <div className="d-flex  flex-wrap flex-md-nowrap  align-items-center justify-content-center justify-content-md-start">
                 <Link href={`/conference/${conference._id}`} className="text-decoration-none">
                <img
                  src={conference?.logoUrl}
                  className={`me-4 mb-3 mb-md-0 ${ConferenceDetailsStyles["conferencelogo"]}`}
                  alt="Conference Logo"
                />
              </Link>
                &nbsp;&nbsp;&nbsp;
                      <div
                className={`col-md-12 col-lg-9  mt-3 mt-lg-0  ${ConferenceDetailsStyles["heading"]}`}
              >
                <h3 className="text-uppercase text-warning opacity-75 mb-3 mb-md-3">
                  {conference?.conference?.landingPage?.title}
                </h3>
                <h5 className="text-uppercase text-white mb-3 mb-md-3">
                  {conference.conference?.landingPage?.conference}
                </h5>
                <p className="text-white">
                {conference?.conference?.landingPage?.startDate}     |     {conference?.conference?.landingPage?.location}
                </p>
                {/* <div className={`mt-1 ${ConferenceDetailsStyles["timings"]}`}>
                  <div className="d-inline-flex flex-nowrap align-items-center justify-content-center  gap-2 p-1">
                    <div>
                   
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
                      
                      <span className="fs-5 text-center">🛏️</span>
                    </div>
                    <div className="text-white mt-3">
                      <b>City Seasons Hotel, Deira</b>
                      <p className="opacity-75">Hotel</p>
                    </div>
                  </div>
                </div> */}
             
              </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto ">
            <RegistrationForm conference={specialRegistration}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormHeader;
