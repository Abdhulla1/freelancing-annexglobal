
import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImage from '@/public/images/conferences/upcoming-bg.webp';

const ConferenceDetails = ({conference}) => {
  return (
    <div className={ConferenceDetailsStyles["container"]} style={{ '--bg-image': `url(${bgImage.src})` }}>
      <div className="container">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center mt-5 mt-lg-0">
            <div>
              <div className="d-flex align-items-center">
                <div>
                  <img
                    src={conference.icon}
                    className={ConferenceDetailsStyles["conferencelogo"]}
                    alt="Conference Logo"
                  />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className={ConferenceDetailsStyles["heading"]}>
                  <h5 className="text-uppercase text-white">
                  {conference.title}
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
                        <b>Dubai, UAE</b>
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
                        <b>City Seasons Hotel, Deira</b>
                        <p>Hotel</p>
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
            <div className={ConferenceDetailsStyles["scroll-container"]}>
              <div className={ConferenceDetailsStyles["scroll-content"]}>
                <div className="row">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className={`col-6 mt-${i % 2 === 0 ? 2 : 5}`}>
                      <div className={ConferenceDetailsStyles.card}>
                        <div>
                          <img
                            src="/images/conferences/pregnant-test.webp"
                            className="img-fluid"
                            alt=""
                          />
                          <div className="mt-3 text-white">
                            <h6 >Obstetrics</h6>
                            <p className="small">Lorem ipsum dolor sit amet.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceDetails;
