import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";

const ConferenceDetails = () => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
            <div>
              <div className="d-flex ">
                <div>
                  <img
                    src="/icons/conference/logo.png"
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </div>{" "}
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h3 className="text-uppercase text-white">Organizing Committee Members</h3>
                  <p className="text-white ">
                  Annual Congress On Gynecology, Obstetrics, And 
                  Women's Health
                  </p>
                  <div className="mt-4">
                    <button className="brand-btn h3">
                      Grab Your Seats Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block"></div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
