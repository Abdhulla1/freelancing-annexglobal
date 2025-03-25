import React from "react";
import DiscoverySessionsStyles from "./DiscoverySessions.module.css";

const DiscoverySessions = () => {
  const Sessions = [
    {
      title: "Point Of View: Upcoming Trends And",
    },
    {
      title: "Diabetes Management: Pharmacology",
    },
    {
      title: "Innovations In Diabetes Diagnosis",
    },
    {
      title: "Diabetes Management And Treatment",
    },
    {
      title: "Infectious Diseases And Preventive",
    },
    {
      title: "Advance In Clinical Medicine",
    },
    {
      title: "Mental Health And Psychological ",
    },
    {
      title: "Global Health And Internal Medicine",
    },
    {
      title: "Public Health And Nutrition",
    },
  ];

  return (
    <div className={DiscoverySessionsStyles["container"]}>
      <div className="container py-5">
        <h3 className="text-white">Innovation & Discovery Sessions</h3>
        <div className="row mt-5">
          {Sessions.map((sess, i) => (
            <div className="col-md-6 col-lg-4 mt-4 d-flex " key={i}>
              <div className={DiscoverySessionsStyles["card"]}>
                <span className={DiscoverySessionsStyles["text"]}>
                  {sess.title}
                </span>
                <div className={DiscoverySessionsStyles["icon"]}>
                  <i className="pi-reply pi"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverySessions;
