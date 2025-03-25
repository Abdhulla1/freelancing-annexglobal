import React from "react";
import AboutMissionStyles from "./AboutMission.module.css";

const AboutMission = () => {
  return (
    <div className={`my-5 container ${AboutMissionStyles[""]}`}>
      <div className="row">
        <div className="col-lg-6 col-md-12 d-flex d-md-block justify-content-center">
          <div>
            <h1 className={AboutMissionStyles["heading"]}>ABOUT</h1>
            <div className={AboutMissionStyles["sub-heading"]}>
              <h3 className="fw-bold">OUR MISSION</h3>
              <div className="pe-4">
                <p className={AboutMissionStyles["about-content"]}>
                  The Annex Global Conference Fosters Innovation And
                  Collaboration Across Diverse Industries Worldwide. By Bringing
                  Together Thought Leaders And Experts, We Address Global
                  Challenges, Exchange Insights, And Drive Sustainable Progress.
                  Our Platform Enables Knowledge Sharing, Inspiring New Ideas
                  And Collective Action Through Cross-Sector Partnerships. We
                  Focus On Solutions For Climate Change And Healthcare
                  Disparities, While Empowering Future Leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <img
            src="/images/conferences/pregnant-lady.webp"
            className={AboutMissionStyles["img-style"]}
            alt=""
          />
          <div className={AboutMissionStyles["overlay-text"]}>
            <div className={AboutMissionStyles["icon-wrapper"]}>
              <i className="pi-play-circle h3 m-0 pi"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
