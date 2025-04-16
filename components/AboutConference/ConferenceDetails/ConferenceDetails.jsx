import React from "react";
import ConferenceDetailsStyles from "./ConferenceDetails.module.css";
import bgImage from "@/public/images/conferences/upcoming-bg.webp";
import cardImg from "@/public/images/conferences/pregnant-test.png";
import babyIcon from "@/public/images/conferences/baby-icon.png";
import starIcon from "@/public/images/conferences/star.png";
import Link from "next/link";
const ConferenceDetails = ({ conference }) => {

  return (
    <div
      className={ConferenceDetailsStyles["container"]}
      style={{ "--bg-image": `url(${bgImage.src})` }}
    >
      <div className="container">
        <div className="row">
          <div className=" col-md-12 col-lg-8 col-xl-7 d-flex align-items-center mt-5 mt-lg-0">
            <div>
              <div className="d-flex align-items-center">
                <Link href="#" className="text-decoration-none">
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
                  <p className="text-white fst-italic">{"Theme: “Enhancing Women’s Health: Improvement, Difficulties, and Innovative Thoughts in Obstetrics and Gynecology”"}</p>
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
              <div className="mt-4 gap-3 d-flex flex-column flex-md-row">
                <Link href={ `/conference/${conference.id}/registration`} className={`text-decoration-none ${ConferenceDetailsStyles["brand-btn"]}`}>Grab Your Seats Now</Link>
                <Link href={ `/conference/${conference.id}/scientific-program`}className={ `text-decoration-none ${ConferenceDetailsStyles["program-btn"]}`}>Scientific Program</Link>
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
                            src={cardImg.src}
                            className={`img-fluid ${ConferenceDetailsStyles.cardimg}`}
                            alt="card image"
                          />
                          <div className={`mt-3 text-white ${ConferenceDetailsStyles.cardContent} `}>
                            <div>
                              <h6>Obstetrics</h6>
                              <p className="small">
                                Lorem ipsum dolor sit amet.
                              </p>
                            </div>
                            <img
                              src={`${i % 2 === 0 ? babyIcon.src : starIcon.src}`}
                              className={`img-fluid ${ConferenceDetailsStyles.icon}`}
                              alt="card image"
                            />
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
