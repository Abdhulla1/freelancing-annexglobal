import AboutMissionStyle from "./AboutMission.module.css";

import React from "react";

const AboutMission = () => {
  return (
    <div
      className={`bg-black pt-5 pb-5  ${AboutMissionStyle["about-mission-container"]}`}
    >
      <div className="container-lg">
        <div className="row ">
          <div className="col-md-6 d-flex align-items-stretch">
            <div className={AboutMissionStyle["image-container"]}>
              <img
                src="/images/home/about-our-mission.webp"
                className="img-fluid"
                alt=""
              />
              <div className={AboutMissionStyle["overlay-text"]}>
                <div className={AboutMissionStyle["icon-wrapper"]} >
                  <img src="/icons/annex_logo.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center mt-3 mt-md-0 p-3">
            <div>
              <h3 className="text-white text-uppercase">About the mission</h3>
              <div className="mt-3">
                <p
                  className={
                    "text-white fw-normal " + AboutMissionStyle["lineheight"]
                  }
                >
                  The Annex Global Conference fosters innovation and
                  collaboration across diverse industries worldwide. By bringing
                  together thought leaders and experts, we address global
                  challenges, exchange insights, and drive sustainable progress.
                  Our platform enables knowledge sharing, inspiring new ideas
                  and collective action through cross-sector partnerships. We
                  focus on solutions for climate change and healthcare
                  disparities while empowering future leaders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
