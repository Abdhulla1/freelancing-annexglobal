import React from "react";
import ConferenceDetailsStyles from "./RegistrationFormHeader.module.css";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

const RegistrationFormHeader = ({ conference }) => {

  return (
    <div className={`${ConferenceDetailsStyles["container"]}`}>
      <div className="container my-5 ">
        <div className="row d-flex flex-column align-items-center justify-content-center ">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center justify-content-center  mt-lg-0">
            <div>
              <div className="d-flex ">
                <div>
                  <img
                    src={conference.icon}
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h3 className="text-uppercase text-white">Registration</h3>
                  <p className="text-white ">
                 {conference.title}
                  </p>
                  <p className="text-white fs-6">
                    {`${conference.date} | ${conference.location}`}
                  </p>
                  {/* <div className="mt-4">
                    <button className="brand-btn h3">
                      Grab Your Seats Now
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-auto ">
            <RegistrationForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationFormHeader;
