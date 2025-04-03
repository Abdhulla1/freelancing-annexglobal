import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import Image from "next/image";
const ConferenceDetails = ({conference}) => {

  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="container my-5">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
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
                  <h3 className="text-uppercase text-white">Scientific Program</h3>
                  <p className="text-white ">
                 {conference.title}
                  </p>
                  <div className="mt-4">
                    <button className={`${ConferenceDetailsStyles["brand-btn"]}`}>
                      Grab Your Seats Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4 col-xl-5 mx-auto d-none d-lg-block">
             <Image
                            className={ConferenceDetailsStyles["ocm"]}
                            src="/images/conferences/webinar-program.png"
                            alt="speaker"
                            height={350}
                            width={350}
                            quality={100}
                          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
