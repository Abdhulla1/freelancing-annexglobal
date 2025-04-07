import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import Image from "next/image";
import Link from "next/link";

const ConferenceDetails = ({ conference }) => {
  return (
    <div className={`vh-75 ${ConferenceDetailsStyles["container"]}`}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center mt-lg-0">
            <div>
              <div className="d-flex align-items-center">
              <Link href={`/conference/${conference.id}`} className="text-decoration-none">
              <img
                    src={conference.icon}
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h5 className="text-uppercase text-white">
                  {conference.title}
                  </h5>
                  <p className="text-white">{conference.theme}</p>
                </div>
              </div>
              <div className={`mt-1 ${ConferenceDetailsStyles["timings"]} `}>
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
              <div className="mt-4 gap-3 d-flex flex-column flex-md-row">
              <Link href={ `/conference/${conference.id}/registration`} className={`text-decoration-none ${ConferenceDetailsStyles["brand-btn"]}`}>Grab Your Seats Now</Link>
              <Link href={ `/conference/${conference.id}/webinar-program`}className={ `text-decoration-none ${ConferenceDetailsStyles["program-btn"]}`}>Webinar Program</Link>              </div>
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
