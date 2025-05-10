import React from "react";
import ConferenceDetailsStyles from "./SponsorsExhibitorsDetails.module.css";
import Image from "next/image";
import Link from "next/link";
const SponsorsExhibitorsDetails = ({ conference }) => {
  return (
    <div className={ConferenceDetailsStyles["container"]}>
      <div className="ms-4">
        <div className="row ">
          <div className="p-4 col-md-12 col-lg-8 col-xl-7 d-flex align-items-center  mt-lg-0">
            <div>
              <div className="d-flex ">
                     <Link href={`/conference/${conference.id}`} className="text-decoration-none">
                <img
                  src={conference.icon}
                  className={`me-4 mb-3 mb-md-0 ${ConferenceDetailsStyles["conferencelogo"]}`}
                  alt="Conference Logo"
                />
              </Link>
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h3 className="text-uppercase text-white">Sponsors & Exhibitors</h3>
                  <p className="text-white ">
                 {conference.title}
                  </p>
                  <p className="text-white fs-6 ">
                March 10/11/2025     |     Dubai, UAE
                  </p>
                  {/* <div className="mt-4">
                    <button className={`h3 ${ConferenceDetailsStyles["brand-btn"]}`}>
                      Grab Your Seats Now
                    </button>
                  </div> */}
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
