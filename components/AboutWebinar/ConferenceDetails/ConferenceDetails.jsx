import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import Image from "next/image";
const ConferenceDetails = ({ conference }) => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <img
                    src="/icons/conference/logo.png"
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </div>{" "}
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h5 className="text-uppercase text-white">
                    Annual Congress on Gynecology, Obstetrics and women's health
                  </h5>
                </div>
              </div>
              <div className={`mt-5 ${ConferenceDetailsStyles["timings"]} `}>
                <div className="row">
                  <div className="col-6 col-md-3 border-end border-white">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-calendar text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>12-03-2025</b>
                        <p>Date</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 border-end border-white">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-map-marker text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>GMT + 4</b>
                        <p>Location</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mt-md-0 mt-3">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <i className="pi h4 pi-clipboard text-white"></i>
                      </div>
                      <div className="text-white">
                        <b>Zoom Application</b>
                        <p>Video Call</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="brand-btn h3">Grab Your Seats Now</button>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block">
            <div
              className={ConferenceDetailsStyles["video-conference-wrapper"]}
            >
              <Image
                className={ConferenceDetailsStyles["video-conference"]}
                src="/images/conferences/webinar-headerbg.png"
                alt="video-conference"
                height={400}
                width={600}
                quality={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
