import React from "react";
import ProspectusStyles from "./Prospectus.module.css";

const Prospectus = () => {
  return (
    <div className={`py-5 ${ProspectusStyles["container"]}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h3>Gynecology Conference 2025</h3>
            <p className={ProspectusStyles["passage"]}>
              Gynecology Conference Serves As A Platform To Explore Recent
              Advancements In The Field, Exchange Knowledge, And Collaborate On
              Addressing Global Challenges In Women's Health. Encompassing
              Diverse Subjects Such As Health Research, Public Health,
              Healthcare Delivery, And The Implementation Of Gynecological
              Policies, The Conference Facilitates Comprehensive Discussions.
            </p>
            <button className={ProspectusStyles["btn-download"]}>
              Download Prospectus
            </button>
            <div className={ProspectusStyles["overlay-text"]}>
              <div className={ProspectusStyles["icon-wrapper"]}>
                <i className="pi-angle-double-left h3 m-0 pi"></i>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="mt-3 row">
              <div className="col-lg-6">
                <div className={ProspectusStyles["card"]}>
                  <img
                    src="/images/conferences/past-conference.webp"
                    alt="Event Image"
                  />

                  <div className={ProspectusStyles["overlay"]}>
                    <button className={ProspectusStyles["register-btn"]}>
                      GET TICKETS
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6 mt-3 mt-lg-0">
                <div className={ProspectusStyles["card"]}>
                  <img
                    src="/images/conferences/past-conference.webp"
                    alt="Event Image"
                  />

                  <div className={ProspectusStyles["overlay"]}></div>
                </div>
              </div>
              <div className="col-lg-3 col-6 mt-3 mt-lg-0">
                <div className={ProspectusStyles["card"]}>
                  <img
                    src="/images/conferences/past-conference.webp"
                    alt="Event Image"
                  />

                  <div className={ProspectusStyles["overlay"]}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospectus;
